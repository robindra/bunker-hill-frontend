import { useEffect, useRef, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import useHttp from '../../hooks/use-http';
import Details from './details';
const Results = (props) => {    
    const configs = useSelector(state => state.config.config);   
    const {isLoading, error, sendRequest: fetchResults} = useHttp();
    const dateRef = useRef();
    const [date, setDate] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [matchResults, setMatchResults] = useState([]);
    const [selectedMatch, setSelectedMatch] = useState([]);

    // const fetchResults = async() => {
    //     const response = await fetch(configs.MATCH);
    //     if (response.ok) {
    //         const results = await response.json();
    //         setMatchResults(results.data);
    //         const uniqueDate = getUniqueDates(results.data);
    //         setDate(uniqueDate);
    //         setSelectedMatch([results.data[0]]);
    //     }
    // }  


    const getUniqueDates = (records) => {
        const uniqueDates = [];
        records.forEach(match => {
            console.log(match.played)
            if (uniqueDates.indexOf(match.date) == -1 && match.played) {
                uniqueDates.push(match.date)
            }
        });
        return uniqueDates;
    }

    const onChangeDateHandler = () => {
        setSelectedDate(dateRef.current.value);
    }

    const formateDate = (date) => {
        return new Date(date).toString().split(" ");
    }

    const formatTime = (time) => {
        const splitHour = time.split(":");
        return splitHour[0] > 12 ? `${time} PM` : `${time} AM`;
    }

    const viewDetails = (matchId) => {
        const filterMatch = matchResults.filter(match => match._id == matchId);
        setSelectedMatch([filterMatch[0]]);
        window.scrollTo(0,0)
    }

    useEffect(() => {
        const handleResultResponse = (results) => {
            setMatchResults(results.data);
            const uniqueDate = getUniqueDates(results.data);
            setDate(uniqueDate);
            setSelectedMatch([results.data[0]]);
        }
        fetchResults({ url: configs.MATCH }, handleResultResponse);
    }, [fetchResults]);
    return (
        <>
           <section class="tg-main-section tg-haslayout">
				<div class="container">
					<div class="tg-section-name">
						<h2>match result</h2>
					</div>
					<div class="col-sm-11 col-xs-11 pull-right">
						<div class="row">
                            <div class="tab-content tg-tabscontent">
                                <div class="form-group">
                                    <div class="tg-select" style={{'margin-bottom':'20px'}}>
                                        <select name="contact[type]" style={{ 'width': '49%', "margin-rigth": "20px" }} onChange={onChangeDateHandler} ref={dateRef}>
                                            <option value="">Select Date</option>    
                                            {date && date.length && date.map(d => {
                                                return <option key={d }>{d}</option>
                                            })}
                                        </select>                                       
                                    </div>
                                </div>    
                                <br />

                                {
                                    selectedMatch && selectedMatch.length && selectedMatch.map(match => {
                                        return (
                                            <Details pdp={match.pdp} teams={match.teams} played={match.played} />
                                        )
                                    })
                                }
							</div>
                            <ul class="tg-tickets tg-tabnav" role="tablist">
                                {matchResults && matchResults.length && matchResults.filter(result=> (selectedDate !== '' && result.date == selectedDate) || (selectedDate == '' && result.date != selectedDate)).map(result => {
                                    return (
                                        <>
                                            {result.played && <li role="presentation" class="active">
                                                <a href="#one" aria-controls="one" role="tab" data-toggle="tab">
                                                    <div class="tg-ticket">
                                                        <time class="tg-matchdate" datetime="2016-05-03">{formateDate(result.date)[2]}<span>{formateDate(result.date)[1]}</span></time>
                                                        <div class="tg-matchdetail">
                                                            <span class="tg-theme-tag">Bunker Football NFC</span>
                                                            <h4>{result.teams.team1.name} <span>vs</span> {result.teams.team2.name}</h4>
                                                            <ul class="tg-matchmetadata">
                                                                <li><time datetime="2016-05-03">{formatTime(result.time.start)}</time></li>
                                                                <li><address>{result.venue}</address></li>
                                                            </ul>
                                                        </div>
                                                        <div class="tg-btnsbox">
                                                            <span class="tg-btn" onClick={() => { viewDetails(result._id) }}>view result</span>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>}                                              
                                        </>
                                    )
                                })}
                                {
                                    date.length == 0 && <li>Oops! no record found</li>
                                }
							</ul>
						</div>
					</div>
				</div>
			</section>
        </>
    )
};

export default Results;