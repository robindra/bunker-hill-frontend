import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import venue from "../../utils/venue";
const AddFixtures = (props) => {
    const navigate = useNavigate();
    let timeoutId;
    const configs = useSelector(state => state.config.config);
    const categoryRef = useRef();
    const dateRef = useRef();
    const startTimeRef = useRef();
    const venueRef = useRef();
    const team1Ref = useRef();
    const team2Ref = useRef();
    const [todayDate, setTodayDate] = useState("");
    const [category, setCategory] = useState([]);
    const [enteredDate, setEnterDate] = useState("");
    const [teams1, setTeams1] = useState([]);
    const [teams2, setTeams2] = useState([]);
    const [selectedFirstTeam, setSelectedFirstTeam] = useState("");
    const [selectedSecondTeam, setSelectedSecondTeam] = useState("");
    const [venues, setVenues] = useState([]);
    const [showAlert, setShowAlert] = useState(false);

    const formSubmitHandler = async (event) => {        
        event.preventDefault();
        setShowAlert(false);
        const payLoad = {
            date: dateRef.current.value,
            time: {
                start: startTimeRef.current.value,
                end: calculateEndTime(startTimeRef.current.value)
            },
            venue: venueRef.current.value,
            teams: {
                team1: team1Ref.current.value,
                team2: team2Ref.current.value
            }, 
            category: categoryRef.current.value
        }
        const authToken = localStorage.getItem('authToken');
        const response = await fetch(configs.MATCH, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ authToken
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(payLoad) // body data type must match "Content-Type" header
        });
        if (response.ok) {
            setShowAlert(true);
            setTimeout(() => {
                navigate("/fixtures");   
            }, 2000);
        }
    }

    const onChangeCategory = (evt) => {
        fetchTeams(categoryRef.current.value)
    }

    const onChangeTeam1 = (evt) => {
        setSelectedFirstTeam(team1Ref.current.value)
    }

    const onChangeTeam2 = (evt) => {
        setSelectedSecondTeam(team2Ref.current.value)
    }

    const fetchCategory = useCallback(async () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(async() => {
            const categoryResponse = await fetch(configs.CATEGORY);
            if (categoryResponse.ok) {
                const categories = await categoryResponse.json();
                setCategory(categories.data);
                setVenues(venue);
                setTodayDate(getTodayDate());
            }
        }, 1000)        
    });

    const fetchTeams = async (catId) => {
        if (!catId) return [];
        const authToken = localStorage.getItem('authToken');
        const response = await fetch(`${configs.CATEGORY}/${catId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ authToken
            }
        }
        );
        if (response.ok) {
            const teamDetails = await response.json();
            setTeams1(teamDetails.data.teams);
            setTeams2(teamDetails.data.teams);
        } 
    }
    
    useEffect(() => {
        fetchCategory();
    }, []);

    const getTodayDate = () => {
        const date = new Date();
        const month = date.getMonth() < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        return `${date.getFullYear()}-${month}-${day}`
    }
    const calculateEndTime = (startTime) => {
        if (!startTime) return "00:00";
        const splitHourMinute = startTime.split(":");
        let endTimeMinutes = +splitHourMinute[1] + 30;
        if (+endTimeMinutes - 60 > 0) {
            return [+splitHourMinute[0] + 1, endTimeMinutes - 60].join(":");
        } else {
            return [+splitHourMinute[0], endTimeMinutes].join(":");
        }
    }
    return (
        <section className="tg-main-section tg-haslayout">
            <div className="container">
                <div class="tg-section-name">
                    <h2>Add Fixtures</h2>
                </div>
                <div class="col-sm-11 col-xs-11 pull-right">
                    {showAlert && <div class="tg-posttitle" style={{ 'textTransform':'none', 'textAlign': 'center'}}>
                        <h3>
                            <a href="#">Updated successfully!</a>
                        </h3>
                    </div>}
                    {!showAlert && <form onSubmit={formSubmitHandler} class="tg-commentform help-form" id="tg-commentform">
                        <fieldset>
                            <div className="form-group">
                                <input type="date" id="start" name="trip-start" min={todayDate } ref={dateRef} />
                                <div style={{ "display": "inline-block", "margin-left":"10px" }}>Start At: <input type="time" id="appt" name="appt" min="06:00" max="18:00" required ref={startTimeRef}></input> (30 minutes match)</div>
                                {/* <div style={{ "display": "inline-block" }}>End At: <input type="time" id="appt" name="appt" min="06:00" max="18:00" required ref={timeRef}></input></div> */}
                            </div>
                            <div class="form-group">
                                <div class="tg-select" style={{ 'width': '48%', "margin-rigth": "20px" }}>
                                    <select name="contact[type]" ref={categoryRef}  onChange={onChangeCategory}>
                                        <option value="">Category</option>
                                        {
                                            category.length && category.map(cat => {
                                                return <option key={cat.id} value={cat.id}>{cat.title} - {cat.description}</option>;
                                            })
                                        }                                        
                                    </select>
                                </div>
                                <div class="tg-select" style={{ 'width': '48%', "margin-rigth": "20px", "float": "right" }}>
                                    <select name="contact[type]"  ref={venueRef}>
                                        <option value="">Venue</option>
                                        {venues.length && venues.map((item, idx) => {
                                            return <option key={item + "_" + idx}>{item}</option>
                                        })}                                        
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="tg-select">
                                    <select name="contact[type]" style={{ 'width': '48%', "margin-rigth": "20px" }} ref={team1Ref} onChange={onChangeTeam1}>
                                        <option value="">Team 1</option>
                                        {teams1 && teams1.length && teams1.filter(team => team._id !== selectedSecondTeam).map(team => {
                                            return <option key={team._id}  value={team._id}>{team.name}</option>
                                        })}                                        
                                    </select>
                                    <select name="contact[type]" style={{ 'width': '48%', "float":"right" }} ref={team2Ref} onChange={onChangeTeam2}>
                                        <option value="">Team 2</option>
                                        {teams2 && teams2.length && teams2.filter(team => team._id !== selectedFirstTeam).map(team => {
                                            return <option key={team._id}  value={team._id}>{team.name}</option>
                                        })}
                                    </select>
                                </div>
                            </div>                            
                            <div class="form-group">
                                <button type="submit" class="tg-btn">Add</button>
                            </div>
                        </fieldset>
                    </form>}
                </div>
            </div>
        </section>
    );
};

export default AddFixtures;