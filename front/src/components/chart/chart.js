import { useState, useEffect} from "react";
import DatePicker from "react-datepicker";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { headers } from "../../auth";
import axios from "axios";
import config from '../../config';
import AdminSidebar from "../adminSidebar/adminSidebar";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const Chart = ()=>{

    const [data, setData] = useState(null);
    const [end, setEndDate] = useState(new Date());
    let date = new Date(end);
    date.setDate(end.getDate() -8);
    const [start, setStartDate] = useState(date);

    const onStartChange = (e)=>{
      setStartDate(e);
      fetch(e, end);
    }

    const onEndChange = (e)=>{
      setEndDate(e);
      fetch(start, e);
    }

    const fetch = (data1, date2)=>{

      let startDate = data1.getFullYear() + '-' + (data1.getMonth() < 9 ? '0' + (data1.getMonth()+1) : (data1.getMonth() + 1) )  + '-' + (data1.getDate() < 9 ? '0' + (data1.getDate()+1) : (data1.getDate() + 1) );
      let endDate = date2.getFullYear() + '-' + (date2.getMonth() < 9 ? '0' + (date2.getMonth()+1) : (date2.getMonth() + 1) )  + '-' + (date2.getDate() < 9 ? '0' + (date2.getDate()+1) : (date2.getDate() + 1) );
      
      axios.get(`${config.api}/users/statistics?start=${startDate}&end=${endDate}`, headers).then(res => {
        
        let response = res.data;
        let labels = [];
        let data = [];
        let data2 = [];

        response.forEach((row)=>{
            labels.push(row[0]);
            data.push(row[1]);
            data2.push(row[2]);
        })

        let compose = {
          labels: labels,
          datasets: [
            {
              label: 'Пользователи',
              data: data,
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
              label: 'Сесии',
              data: data2,
              borderColor: 'rgb(50, 168, 82)',
              backgroundColor: 'rgba(50, 168, 82, 0.5)',
            }
          ]
        };

        setData(compose);

       });
    }

    useEffect(()=>{
      fetch(start, end);
    },[]);

    return(
      <section className="cabinet-section">
            <img className="section__bg" src="img/landing/intro__bg.png" alt=""/>
            <div className="container">
                <AdminSidebar></AdminSidebar>
                <div className="cabinet__content">
                    <div className="cabinet__list cabinet__list-history gray relative">
                        <h1 className="t-title">Статистика по сайту</h1>
                        <div className="control_bar">
                           <div className="control_bar_item">
                            <label>До</label>
                            <DatePicker selected={end} onChange={onEndChange} minDate={start}></DatePicker>
                           </div>
                           <div className="control_bar_item">
                            <label>C</label>
                            <DatePicker selected={start} onChange={onStartChange} maxDate={end}></DatePicker>
                           </div>
                        </div>
                        {
                            data &&
                            <div className="chart_wrapper">
                               <Line data={data} />
                            </div>
                        }
                    </div>
                </div>
            </div>
      </section>

    );
}

export default Chart;