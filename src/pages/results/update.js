import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Details from './details';
const UpdateResults = (props) => {
    const navigation = useNavigate();
    const configs = useSelector(state => state.config.config);
    const dateRef = useRef();
    const team1Ref = useRef();
    const team2Ref = useRef();
    const [date, setDate] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [matchResults, setMatchResults] = useState([]);
    const [selectedMatch, setSelectedMatch] = useState([]);
    const [selectedMatchId, setSelectedMatchId] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const fetchResults = async() => {
        const response = await fetch(configs.MATCH);
        if (response.ok) {
            const results = await response.json();
            setMatchResults(results.data);
            const uniqueDate = getUniqueDates(results.data);
            setDate(uniqueDate);
            setShowAlert(false);
            if (uniqueDate.length == 0) {
                setTimeout(() => {
                    navigation('/results');
                }, 1500);
            }
            // setSelectedMatch([results.data[0]]);
        }
    }

    const getUniqueDates = (records) => {
        const uniqueDates = [];
        records.forEach(match => {
            console.log(match.played)
            if (uniqueDates.indexOf(match.date) == -1 && !match.played) {
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

    const fetchSingleMatch = (matchId) => {
        setShowAlert(false);
        const filterMatch = matchResults.filter(match => match._id == matchId);
        setSelectedMatch([filterMatch[0]]);
        setSelectedMatchId(matchId);
        setShowForm(true);
        console.log(selectedMatch);
        window.scrollTo(0, 0);
    }

    const onFormSubmit = async(event) => {
        event.preventDefault();
        const payLoad = {
            pdp: {
                goals: {
                    team1: team1Ref.current.value, 
                    team2: team2Ref.current.value                    
                }
            }, 
            played: true
        }
        const authToken = localStorage.getItem('authToken');
        const updateResponse = await fetch(`${configs.MATCH}/${selectedMatchId}`, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+authToken
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(payLoad) // body data type must match "Content-Type" header
        });
        if (updateResponse.ok) {
            setShowAlert(true);
            setSelectedMatch([]);
            setTimeout(() => {
                fetchResults();
            }, 1500);
        }
    }

    useEffect(() => {
        fetchResults();
    }, []);
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
                                {date.length == 0 && <div class="tg-posttitle" style={{ 'textTransform':'none', 'textAlign': 'center'}}>
                                    <h3>
                                        <a href="#">Oop! no record found. Redirecting to result page. </a>
                                    </h3>
                                </div>}
                                {showAlert && <div class="tg-posttitle" style={{ 'textTransform':'none', 'textAlign': 'center'}}>
                                    <h3>
                                        <a href="#">Updated successfully!</a>
                                    </h3>
                                </div>}
                                {
                                    !showAlert && selectedMatch.length > 0 && <div role="tabpanel" class="tab-pane fade in active" id="one">
                                            <div class="tg-matchresult">
                                                <div class="tg-box">
                                                    <div class="tg-teamscore">
                                                        <strong class="tg-team-logo">
                                                            <a href="#"><img src="images/team-logo/logo-01.png" alt="image description" /></a>
                                                        </strong>
                                                        <div class="tg-team-nameplusstatus">
                                                            <h4>
                                                                <a href="#">
                                                                    {selectedMatch[0].teams.team1.name} 
                                                                </a>                                                        
                                                            </h4>                                                           
                                                        </div>
                                                    </div>
                                                    <div class="tg-teamscore">
                                                        <strong class="tg-team-logo">
                                                            <a href="#">
                                                                <img src="images/team-logo/logo-02.png" alt="image description" />
                                                            </a>
                                                        </strong>
                                                        <div class="tg-team-nameplusstatus">
                                                            <h4>
                                                                <a href="#">
                                                                    {selectedMatch[0].teams.team2.name}
                                                                </a>
                                                            </h4>
                                                        </div>
                                                    </div>
                                                </div>
                                        </div>
                                        
                                        <form onSubmit={onFormSubmit}>
                                            <div class="form-group">
                                                <input type="text" required="" placeholder="Team 1 Goload" class="form-control" name="contact[name]" style={{ "width": '50%', 'margin-top': '20px' }} ref={team1Ref} />
                                                <input type="text" required="" placeholder="Team 2 Goload" class="form-control" name="contact[name]" style={{ "width": '50%', 'margin-top': '20px' }} ref={team2Ref} />
                                                <div class="tg-btnsbox" style={{'float': 'none', 'textAlign':'center'}}>
                                                    <button type='submit' class="tg-btn">Submit</button>
                                                </div>
                                            </div> 
                                        </form>
                                </div>}
							</div>
                            <ul class="tg-tickets tg-tabnav" role="tablist">
                                {matchResults && matchResults.length && matchResults.filter(result=> (selectedDate !== '' && result.date == selectedDate) || (selectedDate == '' && result.date != selectedDate)).map(result => {
                                    return (
                                        <>
                                            {!result.played && <li role="presentation" class="active">
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
                                                            <span class="tg-btn" onClick={() => { fetchSingleMatch(result._id) }}>update result</span>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>}                                              
                                        </>
                                    )
                                })}
                                
								
								{/* <li role="presentation">
									<a href="#two" aria-controls="two" role="tab" data-toggle="tab">
										<div class="tg-ticket">
											<time class="tg-matchdate" datetime="2016-05-03">27<span>june</span></time>
											<div class="tg-matchdetail">
												<span class="tg-theme-tag">Bunker Football NFC</span>
												<h4>Lumberjacks <span>vs</span> Killer Whales</h4>
												<ul class="tg-matchmetadata">
													<li><time datetime="2016-05-03">15:30 PM</time></li>
													<li><address>Soccer Stadium, Dubai</address></li>
												</ul>
											</div>
											<div class="tg-btnsbox">
												<span class="tg-btn">view result</span>
											</div>
										</div>
									</a>
								</li>
								<li role="presentation">
									<a href="#three" aria-controls="three" role="tab" data-toggle="tab">
										<div class="tg-ticket">
											<time class="tg-matchdate" datetime="2016-05-03">27<span>june</span></time>
											<div class="tg-matchdetail">
												<span class="tg-theme-tag">Bunker Football NFC</span>
												<h4>Lumberjacks <span>vs</span> Killer Whales</h4>
												<ul class="tg-matchmetadata">
													<li><time datetime="2016-05-03">15:30 PM</time></li>
													<li><address>Soccer Stadium, Dubai</address></li>
												</ul>
											</div>
											<div class="tg-btnsbox">
												<span class="tg-btn">view result</span>
											</div>
										</div>
									</a>
								</li>
								<li role="presentation">
									<a href="#four" aria-controls="four" role="tab" data-toggle="tab">
										<div class="tg-ticket">
											<time class="tg-matchdate" datetime="2016-05-03">27<span>june</span></time>
											<div class="tg-matchdetail">
												<span class="tg-theme-tag">Bunker Football NFC</span>
												<h4>Lumberjacks <span>vs</span> Killer Whales</h4>
												<ul class="tg-matchmetadata">
													<li><time datetime="2016-05-03">15:30 PM</time></li>
													<li><address>Soccer Stadium, Dubai</address></li>
												</ul>
											</div>
											<div class="tg-btnsbox">
												<span class="tg-btn">view result</span>
											</div>
										</div>
									</a>
								</li>
								<li role="presentation">
									<a href="#five" aria-controls="five" role="tab" data-toggle="tab">
										<div class="tg-ticket">
											<time class="tg-matchdate" datetime="2016-05-03">27<span>june</span></time>
											<div class="tg-matchdetail">
												<span class="tg-theme-tag">Bunker Football NFC</span>
												<h4>Lumberjacks <span>vs</span> Killer Whales</h4>
												<ul class="tg-matchmetadata">
													<li><time datetime="2016-05-03">15:30 PM</time></li>
													<li><address>Soccer Stadium, Dubai</address></li>
												</ul>
											</div>
											<div class="tg-btnsbox">
												<span class="tg-btn">view result</span>
											</div>
										</div>
									</a>
								</li> */}
							</ul>
						</div>
					</div>
				</div>
			</section>
        </>
    )
};

export default UpdateResults;