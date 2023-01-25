const WeatherInfo = ({ data }) => {
  return (
    <>
      <div className={data.current.is_day ? "info" : "night"}>
        <div className="main-info">
          <div className="city-name">{data.location.name}</div>
          <div className="day-or-night">
            <img src={data.current && data.current.condition.icon} alt="" />
          </div>
        </div>
        <div className="location-and-temp">
          <div className="location">{data.location.region}</div>
          <div className="temp">{data.current.temp_c}ºC</div>
        </div>
        <div className="data-and-temp-f">
          <div className="data">{data.location.localtime}</div>
          <div className="temp-f">{data.current.temp_f}ºF</div>
        </div>
      </div>
    </>
  );
};
export default WeatherInfo;
