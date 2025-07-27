const MetricCard = ({ title, value, color, icon }) => (
  <div
    className={`flex items-center gap-x-5 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 ${color}`}
  >
    <div className="icon">
      <img src={icon} alt="" width={72} />
    </div>
    <div className="data">
      <p className="text-lg text-gray-700 font-medium">{title}</p>
      <h4 className="text-xl font-bold text-gray-900">{value}</h4>
    </div>
  </div>
);

export default MetricCard;
