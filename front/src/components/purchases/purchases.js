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
import Logs from "../logs/logs";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const Purchases = ()=>{

    const [data, setData] = useState(null);
    const [end, setEndDate] = useState(new Date());
    let date = new Date(end);
    date.setDate(end.getDate() -30);
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
      
      axios.get(`${config.api}/transactions/chart?start=${data1.toString()}&end=${date2.toString()}`, headers).then(res => {
        
        let response = res.data;
        let fiat = response.fiat;
        let crypto = response.crypto;
        let labels = [];
        let amountsFiat = [];
        let amountsCrypto = [];

        Object.keys(fiat).map((key)=>{
          labels.push(key);
          amountsFiat.push(fiat[key]["amount"]);
          amountsCrypto.push(crypto[key]["amount"]);
        });

        let compose = {
          labels: labels,
          datasets: [
            {
              label: 'Покупка за фиат',
              data: amountsFiat,
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
              label: 'Покупка за криптовалюту',
              data: amountsCrypto,
              borderColor: 'rgb(60, 50, 168)',
              backgroundColor: 'rgba(60, 50, 168, 0.5)',
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
                        <h1 className="t-title">Покупки</h1>
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
                    <Logs></Logs>
                </div>
            </div>
      </section>

    );
}

export default Purchases;