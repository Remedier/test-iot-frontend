import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Chart.js에 필요한 구성 요소 등록
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function SensorChart() {
    const [sensorData, setSensorData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8000/sensor-data");
                const data = await response.json();
                setSensorData(data.sensor_data);
            } catch (error) {
                console.error("데이터를 불러오는 중 오류 발생:", error);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 5000); // 5초마다 데이터 갱신

        return () => clearInterval(interval);
    }, []);

    const labels = sensorData.map((data) => new Date(data[2]).toLocaleTimeString()); // 시간 레이블
    const values = sensorData.map((data) => data[1]); // 센서 값

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: "센서 값",
                data: values,
                borderColor: "blue",
                backgroundColor: "rgba(0, 0, 255, 0.2)",
                tension: 0.3,
            },
        ],
    };

    return (
        <div>
            <h2>실시간 센서 데이터 그래프</h2>
            <Line data={chartData} />
        </div>
    );
}

export default SensorChart;
