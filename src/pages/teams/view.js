
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const TeamDetail = (props) => {
    const configs = useSelector(state => state.config.config);
    const { teamId } = useParams();

    const [teamInfo, setTeamInfo] = useState([]);

    const fetchTeamDetails = async () => {
        const response = await fetch(`${configs.TEAMS}/${teamId}`);
        if (response.ok) {
            const team = await response.json();
            setTeamInfo(team.data);
            console.log(teamInfo)
        }
    }
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchTeamDetails();
        }, 200);
        return () => {
            clearTimeout(timeoutId);
        }
    }, []);
    return (
        <>
            <section className="tg-main-section tg-haslayout">
				<div className="container">
					<div className="tg-section-name">
						<h2>top Rated Player</h2>
					</div>
					<div className="col-sm-11 col-xs-11 pull-right">
						<div className="row">
							<div className="tg-topratedplayer tg-haslayout">
								<div className="row">
									<div className="col-md-7 col-sm-12 col-xs-12">
										<div id="tg-playerscrollbar" className="tg-players tg-playerscrollbar">
                                            {
                                                teamInfo && teamInfo.players && teamInfo.players.length && teamInfo.players.map(player => {
                                                    return (
                                                        <div className="tg-player">
                                                            <div className="col-sm-6 col-xs-6 pull-right">
                                                                <div className="tg-playcontent">
                                                                    <a className="tg-theme-tag" href="#">SWEEPER</a>
                                                                    <h3><a href="#">{player.name.first} { player.name.last}</a></h3>
                                                                    <span className="tg-stars"><span></span></span>
                                                                    <div className="tg-description">
                                                                        <p>class: {player.class} {player.section} Dob: {player.dob}</p>
                                                                        <p>Mobile: {player.guardian.mobile}</p>
                                                                    </div>
                                                                    {/* <ul className="tg-socialicons">
                                                                        <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                                                        <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                                                        <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                                                                        <li><a href="#"><i className="fa fa-dribbble"	></i></a></li>
                                                                    </ul> */}
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-6 col-xs-6">
                                                                <figure>
                                                                    <a href="#">
                                                                        <img src="images/player/img-01.png" alt="image description" />
                                                                    </a>
                                                                </figure>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }  
                                            {teamInfo && teamInfo.players && teamInfo.players.length == 0 && <p>No Player Record found!</p>}
										</div>
									</div>
									<div className="col-md-5 col-sm-12 col-xs-12">
										<div className="tg-contentbox">
                                            <div className="tg-section-heading"><h2>{teamInfo.name}</h2></div>
											<div className="tg-description">
                                                {teamInfo.category && <p>{teamInfo.category.title} {teamInfo.category.description}</p>}
											</div>
											{/* <div className="tg-btnbox">
												<a className="tg-btn" href="#"><span>view all</span></a>
											</div> */}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
        </>
    )    
};

export default TeamDetail;
