import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { DateRangePicker } from "react-date-range";
import { addDays, subDays } from "date-fns";

const CalendarFilter = ({
  calendarFilter,
  setCalendarFilter,
  setOpenFilter,
  openFilter,
  applyFilter,
}) => {
  const [calendarFilterHolder, setCalendarFilterHolder] = useState({});
  const [copy, setCopy] = useState("");
  let [searchParams, setSearchParams] = useSearchParams();

  const changeTimezone = (date, ianatz) => {
    var invdate = new Date(
      date.toLocaleString("en-US", {
        timeZone: ianatz,
      })
    );

    var diff = date.getTime() - invdate.getTime();
    return new Date(date.getTime() - diff);
  };

  const [dateRange, setDateRange] = useState([
    {
      startDate: subDays(changeTimezone(new Date(), "America/Los_Angeles"), 7),
      endDate: addDays(changeTimezone(new Date(), "America/Los_Angeles"), 1),
      key: "selection",
    },
  ]);

  const [dateRangeTime, setDateTime] = useState([
    {
      startDate: changeTimezone(new Date(), "America/Los_Angeles").getTime(),
      endDate: changeTimezone(new Date(), "America/Los_Angeles").getTime(),
    },
  ]);

  const onChangeDates = (ranges) => {
    const { selection } = ranges;
    console.log(selection);
    setDateRange([selection]);
  };

  const applyDateRange = () => {
    const { endDate, startDate } = dateRange[0];

    setDateTime({
      startDate: startDate.getTime(),
      endDate: endDate.getTime(),
    });

    setCalendarFilter({
      startDate: startDate.getTime(),
      endDate: endDate.getTime(),
    });

    const dateApply = [
      Math.floor(startDate.getTime() / 1000),
      Math.floor(endDate.getTime() / 1000)
    ];

    applyFilter("date", dateApply);
    filterBySearchParams(null, null);
  };

  const clearDateRange = () => {
    const { endDate, startDate } = dateRange[0];

    setDateTime({
      startDate: startDate.getTime(),
      endDate: endDate.getTime(),
    });

    setCalendarFilter({
      startDate: startDate.getTime(),
      endDate: endDate.getTime(),
    });

    applyFilter("date", []);
  };

  useEffect(() => {
    setCopy(JSON.stringify(calendarFilter));

    filterBySearchParams(calendarFilterHolder, setCalendarFilterHolder);

    const news = filterBySearchParams(
      calendarFilterHolder,
      setCalendarFilterHolder
    );
    if (news) {
      setCalendarFilterHolder({ ...calendarFilter, filters: news });
      return;
    } else {
      setCalendarFilterHolder(calendarFilter);
    }
  }, []);

  const filterBySearchParams = (
    calendarFilterHolder,
    setCalendarFilterHolder
  ) => {
    const filter = {};

    filter.date = searchParams.get("DeliveryDate")
      ? searchParams.get("DeliveryDate").split(",")
      : null;

    if (filter.date) {

      console.log("HOLa", filter);
      setDateRange([
        {
          startDate: new Date( parseInt(filter.date[0]) * 1000) ,
          endDate: new Date( parseInt(filter.date[1])* 1000) ,
          key: 'selection'
        },
      ]);
    }
  };

  return (
    <div>
      <DateRangePicker
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={2}
        ranges={dateRange}
        onChange={onChangeDates}
        color="#1B112F"
        rangeColors={["#00A651", "#00FF9D", "#00692C"]}
      />
      <div className="dt-filters__box-buttons d-flex dt-modal-buttons">
        <button onClick={()=>{
          setOpenFilter({...openFilter,date:false})
        }} className="btn text-m-bold">Cancel</button>
        
        <button
          onClick={() => {
            localStorage.setItem("nextToken", "");
            applyDateRange();
          }}
          className="btn btn-primary text-m-bold"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default CalendarFilter;
