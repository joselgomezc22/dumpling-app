import {useEffect , useState} from 'react'
import { useSearchParams } from "react-router-dom";
import { DateRangePicker } from 'react-date-range';
import { addDays, subDays } from "date-fns";


const CalendarFilter = ({calendarFilter,setCalendarFilter,setOpenFilter,openFilter,applyFilter}) => {
    const [calendarFilterHolder, setCalendarFilterHolder] = useState({});
    const [copy, setCopy] = useState(""); 
    let [searchParams, setSearchParams] = useSearchParams();

    const [dateRange, setDaterange] = useState([
      {
        startDate: subDays(new Date(), 7),
        endDate: addDays(new Date(), 1),
        key: "selection"
      }
    ]);
    
    const [dateRangeTime, setDateTime] = useState([
      {
        startDate: new Date().getTime(),
        endDate: new Date().getTime(),
      }
    ]);

    const onChangeDates = (ranges) => {
      const { selection } = ranges;
      console.log(selection);
      setDaterange([selection]);
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

      applyFilter('date', [startDate.getTime(), endDate.getTime()])
    };

    useEffect(() => {
    
        setCopy(JSON.stringify(calendarFilter));
        
        filterBySearchParams(calendarFilterHolder,setCalendarFilterHolder);
        const news = filterBySearchParams(calendarFilterHolder,setCalendarFilterHolder);
        if(news) {
          setCalendarFilterHolder({...calendarFilter, filters: news})
          return
        } else {
          setCalendarFilterHolder(calendarFilter);
        }
    
      }, [copy])

      const filterBySearchParams = (calendarFilterHolder,setCalendarFilterHolder) => {
  
        const filter = {};
        
        filter.date = searchParams.get("status")? searchParams.get("status").split(",") : null ;
        
        if(filter.date && calendarFilterHolder.filters) {
          const def =  calendarFilterHolder.filters.filter(item => !filter.date.includes(item.label));
          const news = calendarFilterHolder.filters.map((f)=>{
            if( filter.date.includes(f.label)) return {...f,active:true}
            return f
          } )
          return news;
        }    
    };


  return (
    <div>
      <DateRangePicker 
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={2}
        ranges={dateRange}
        onChange={onChangeDates} />
      <div className="dt-filters__box-buttons">
        <button className="btn text-m-bold">Cancel</button>
        <button onClick={() => {
          applyDateRange();
        }} className="btn btn-primary text-m-bold">Apply</button>
      </div>
    </div>
  )
}

export default CalendarFilter