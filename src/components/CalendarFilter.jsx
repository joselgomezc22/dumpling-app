import {useEffect , useState} from 'react'
import { useSearchParams } from "react-router-dom";

const CalendarFilter = ({calendarFilter,setCalendarFilter,setOpenFilter,openFilter,applyFilter}) => {
    const [calendarFilterHolder, setCalendarFilterHolder] = useState({});
    const [copy, setCopy] = useState(""); 
    let [searchParams, setSearchParams] = useSearchParams();
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
    <div>CalendarFilter</div>
  )
}

export default CalendarFilter