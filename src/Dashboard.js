import { useState, useEffect } from "react";

function Dashboard() {
    const [sensorData, setSensorData] = useState([]);
    const [riskLevels, setRiskLevels] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8000/sensor-data");
                const data = await response.json();
                setSensorData(data.sensor_data);
                setRiskLevels(data.risk_levels);
            } catch (error) {
                console.error("데이터를 불러오는 중 오류 발생:", error);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 5000); // 5초마다 데이터 갱신

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h1>실시간 센서 데이터</h1>
            <ul>
                {sensorData.length > 0 ? (
                    sensorData.map((data, index) => (
                        <li key={index}>
                            센서 값: {data[1]} | 위험 수준: <strong>{riskLevels[index]}</strong>
                        </li>
                    ))
                ) : (
                    <li>센서 데이터 없음</li>
                )}
            </ul>
        </div>
    );
}

export default Dashboard;
