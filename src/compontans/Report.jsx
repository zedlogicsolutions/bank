// src/components/Report.jsx
import React from 'react';
import { useQueue } from '../Queuestore';
import '../style/report.css';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const Report = () => {
  const { log, services } = useQueue();

  // Group logs by service
  const serviceSummary = services.map(service => {
    const count = log.filter(item => item.service === service).length;
    return { service, count };
  });

  // Group logs by date
  const groupedByDay = {};
  log.forEach(entry => {
    const date = new Date(entry.time).toLocaleDateString();
    if (!groupedByDay[date]) groupedByDay[date] = [];
    groupedByDay[date].push(entry);
  });

  return (
    <div className='section'>
    <div className="report-container">
      <h1>📊 Service Reports</h1>

      {/* Bar Chart: Token counts per service */}
      <h2>Bar Chart: Tokens Served per Service</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={serviceSummary}>
          <XAxis dataKey="service" />
          <YAxis domain={[0, 1000]} tickCount={7}/>
          <Tooltip  />
          <Legend />
          <Bar dataKey="count" fill="#3498db"  barSize={30} barGap={5}/>
        </BarChart>
      </ResponsiveContainer>

      {/* Daily logs */}
      <h2>🗓 Daily Report</h2>
      {Object.keys(groupedByDay).map(date => (
        <div key={date} className="daily-log">
          <h3>{date}</h3>
          <ul>
            {groupedByDay[date].map((entry, idx) => (
              <li key={idx}>
                {entry.time} - {entry.service}: <strong>{entry.token}</strong> ( {entry.phone})
              </li>
            ))}
          </ul>
          <h1>hello</h1>
        </div>
      ))}

      {/* Raw log history (optional full export) */}
      <h2>📋 Full Service Log</h2>
      <ul>
        {log.map((entry, idx) => (
          <li key={idx}>
            [{entry.time}] {entry.service}: {entry.token} (📞 {entry.phone})
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default Report;
