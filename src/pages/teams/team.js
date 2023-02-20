import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Teams = (props) => {
    const navigate = useNavigate();
    const configs = useSelector(state => state.config.config);
    const [category, setCategory] = useState([]);
    const [teams, setTeams] = useState([]);

    // REfercnce 
    const categoryRef = useRef();
    const fetchCategory = useCallback(async () => {
        const categoryResponse = await fetch(configs.CATEGORY);
        if (categoryResponse.ok) {
            const categories = await categoryResponse.json();
            setCategory(categories.data);
            console.log(category)
            if (category.length) {
                console.log(category)
                fetchTeams(category[0].id);
            }
        }        
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
            setTeams(teamDetails.data.teams)
        } 
    }


    useEffect(() => {
        const fetchCategoryTimeoutId = setTimeout(() => {
            fetchCategory();
        }, 1000);
        return () => {
            clearTimeout(fetchCategoryTimeoutId);
        }
    }, []);

    /**
     * event listener 
     */
    const onCategoryChangeHandler = (evt) => {
        fetchTeams(categoryRef.current.value);
    }

    const viewTeamDetails = (teamId) => {
        navigate(`/team-detail/${teamId}`);
    }

    return (
        <>
           <section class="tg-main-section tg-haslayout">
				<div class="container">
					<div class="tg-section-name">
						<h2>teams</h2>
					</div>
					<div class="col-sm-11 col-xs-11 pull-right">
						<div class="row">
                            <div class="tab-content tg-tabscontent">
                                <div class="form-group">
                                    <div class="tg-select" style={{'margin-bottom':'20px'}}>
                                        <select name="contact[type]" style={{ 'width': '49%', "margin-rigth": "20px" }} onChange={onCategoryChangeHandler} ref={categoryRef}>
                                            <option value="">Select Category</option>    
                                            {category && category.length && category.map(cat => {
                                                return <option key={cat._id} value={cat._id}>{cat.description}</option>
                                            })}
                                        </select>                                       
                                    </div>
                                </div>    
                                <br />

                                {/* {
                                    selectedMatch && selectedMatch.length && selectedMatch.map(match => {
                                        return (
                                            <Details pdp={match.pdp} teams={match.teams} played={match.played} />
                                        )
                                    })
                                } */}
							</div>
                            <ul class="tg-tickets tg-tabnav" role="tablist">
                                {teams && teams.length && teams.map((team, idx) => {
                                    return (
                                        <>
                                            <li role="presentation" class="active">
                                                <a href="#one" aria-controls="one" role="tab" data-toggle="tab">
                                                    <div class="tg-ticket">                                                        
                                                        <div class="tg-matchdetail">
                                                            <span class="tg-theme-tag">Bunker Football NFC</span>
                                                            <h4>#{ idx +1} - {team.name} </h4>
                                                            {/* <ul class="tg-matchmetadata">
                                                                <li><time datetime="2016-05-03">{formatTime(result.time.start)}</time></li>
                                                                <li><address>{result.venue}</address></li>
                                                            </ul> */}
                                                        </div>
                                                        <div class="tg-btnsbox">
                                                            <span class="tg-btn" onClick={() => { viewTeamDetails(team._id) }}>Details</span>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>                                           
                                        </>
                                    )
                                })}
                                {
                                    teams.length == 0 && <li>Oops! no record found</li>
                                }
							</ul>
						</div>
					</div>
				</div>
			</section>
        </>
    )
};

export default Teams;