import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
const Fixtures = (props) => {    
    const configs = useSelector(state => state.config.config);
    const [fixtures, setFixtures] = useState([]);
    
    const fetchFixtures = async () => {
        const response = await fetch(configs.MATCH);
        if (response.ok) {
            const match = await response.json();
            console.log(match);
            setFixtures(match.data);
            const mainswiper = new window.Swiper('#tg-upcomingmatch-slider', {
                direction: 'vertical',
                slidesPerView: 3,
                spaceBetween: 10,
                mousewheelControl: true,
                nextButton: '.tg-themebtnnext',
                prevButton: '.tg-themebtnprev',
                autoplay: 0,
            });
        }
	};
	
	
    useEffect(() => {
        fetchFixtures();
    }, []);

    const formatEventDate = (date, time) => {
        const d = new Date(date).toString().split(" ");
        const t = time.split(":");
        const result = `${d[1]} ${d[2]}, ${d[3]} ${time}`;
        return t[0] > 12 ? result + ' PM' : result+ ' AM'

    }
    return (
        <section className="tg-main-section tg-haslayout">
				<div className="container">
					<div className="tg-section-name">
                    <h2>fixtures</h2>
					</div>
					<div className="col-sm-11 col-xs-11 pull-right">
						<div className="row">
							<div className="tg-latestresult">
								<div className="row">
									<div className="col-md-5 col-sm-12 col-xs-12">
										<div className="tg-contentbox">
											<div className="tg-section-heading"><h2>consectetur adipisicing elit sedia tempor labore</h2></div>
											<div className="tg-description">
												<p>Consectetur adipisicing elit sed do eiusmod temport incididunt utia labore et dolore magna aliqua enima ad minim veniam quistrud on ullamco laboris nisiut aliquip ex ea commodo consequat.</p>
											</div>
											<div className="tg-btnbox">
												<a className="tg-btn" href="#"><span>view all</span></a>
											</div>
										</div>
									</div>
									<div className="col-md-7 col-sm-12 col-xs-12">
										<div id="tg-upcomingmatch-slider" className="tg-upcomingmatch-slider tg-upcomingmatch swiper-container-vertical">
                                        <div className="swiper-wrapper">
                                            {
                                                fixtures && fixtures.length && fixtures.map(match => {
                                                    return (
                                                        <div className="swiper-slide swiper-slide-active" key={match._id} style={{ 'height': '113.333px', 'margin-bottom': '10px' }}>
                                                            <div className="tg-match">
                                                                <div className="tg-matchdetail">
                                                                    <div className="tg-box">
                                                                        <strong className="tg-teamlogo">
                                                                            <img src="images/team-logo/logo-l-02.png" clalt="image description" />
                                                                        </strong>
                                                                        <h3>{match.teams.team1.name}</h3>
                                                                    </div>
                                                                    <div className="tg-box">
                                                                        <h3>vs</h3>
                                                                    </div>
                                                                    <div className="tg-box">
                                                                        <strong className="tg-teamlogo">
                                                                            <img src="images/team-logo/logo-l-02.png" clalt="image description" />
                                                                        </strong>
                                                                        <h3>{match.teams.team2.name}</h3>
                                                                    </div>
                                                                </div>
                                                                <div className="tg-matchhover">
                                                                    <address style={{'width': '80%'}}>{formatEventDate(match.date, match.time.start)} <br />{match.venue}</address>
                                                                    <div className="tg-btnbox">
                                                                        {/* <a className="tg-btn" href="#"><span>Update</span></a> */}
                                                                        {/* <a className="tg-btn" href="#"><span>book my ticket</span></a> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                    
                                                })
                                            }
                                           
												{/* <div className="swiper-slide swiper-slide-next" style={{ 'height': '113.333px', 'margin-bottom': '10px' }}>
													<div className="tg-match">
														<div className="tg-matchdetail">
															<div className="tg-box">
																<strong className="tg-teamlogo">
																	<img src="images/team-logo/logo-l-02.png" clalt="image description" />
																</strong>
																<h3>Gladiators</h3>
															</div>
															<div className="tg-box">
																<h3>vs</h3>
															</div>
															<div className="tg-box">
																<strong className="tg-teamlogo">
																	<img src="images/team-logo/logo-l-02.png" clalt="image description" />
																</strong>
																<h3>Horned frogs</h3>
															</div>
														</div>
														<div className="tg-matchhover">
															<address>Jan16, 2017 15:30 PM Soccer Stadium, Dubai</address>
															<div className="tg-btnbox">
																<a className="tg-btn" href="#"><span>read more</span></a>
																<a className="tg-btn" href="#"><span>book my ticket</span></a>
															</div>
														</div>
													</div>
												</div>
												<div className="swiper-slide" style={{ 'height': '113.333px', 'margin-bottom': '10px' }}>
													<div className="tg-match">
														<div className="tg-matchdetail">
															<div className="tg-box">
																<strong className="tg-teamlogo">
																	<img src="images/team-logo/logo-l-02.png" clalt="image description" />
																</strong>
																<h3>Gladiators</h3>
															</div>
															<div className="tg-box">
																<h3>vs</h3>
															</div>
															<div className="tg-box">
																<strong className="tg-teamlogo">
																	<img src="images/team-logo/logo-l-02.png" clalt="image description" />
																</strong>
																<h3>Horned frogs</h3>
															</div>
														</div>
														<div className="tg-matchhover">
															<address>Jan16, 2017 15:30 PM Soccer Stadium, Dubai</address>
															<div className="tg-btnbox">
																<a className="tg-btn" href="#"><span>read more</span></a>
																<a className="tg-btn" href="#"><span>book my ticket</span></a>
															</div>
														</div>
													</div>
												</div>
												<div className="swiper-slide" style={{ 'height': '113.333px', 'margin-bottom': '10px' }}>
													<div className="tg-match">
														<div className="tg-matchdetail">
															<div className="tg-box">
																<strong className="tg-teamlogo">
																	<img src="images/team-logo/logo-l-02.png" clalt="image description" />
																</strong>
																<h3>Gladiators</h3>
															</div>
															<div className="tg-box">
																<h3>vs</h3>
															</div>
															<div className="tg-box">
																<strong className="tg-teamlogo">
																	<img src="images/team-logo/logo-l-02.png" clalt="image description" />
																</strong>
																<h3>Horned frogs</h3>
															</div>
														</div>
														<div className="tg-matchhover">
															<address>Jan16, 2017 15:30 PM Soccer Stadium, Dubai</address>
															<div className="tg-btnbox">
																<a className="tg-btn" href="#"><span>read more</span></a>
																<a className="tg-btn" href="#"><span>book my ticket</span></a>
															</div>
														</div>
													</div>
												</div>
												<div className="swiper-slide" style={{ 'height': '113.333px', 'margin-bottom': '10px' }}>
													<div className="tg-match">
														<div className="tg-matchdetail">
															<div className="tg-box">
																<strong className="tg-teamlogo">
																	<img src="images/team-logo/logo-l-02.png" clalt="image description" />
																</strong>
																<h3>Gladiators</h3>
															</div>
															<div className="tg-box">
																<h3>vs</h3>
															</div>
															<div className="tg-box">
																<strong className="tg-teamlogo">
																	<img src="images/team-logo/logo-l-02.png" clalt="image description" />
																</strong>
																<h3>Horned frogs</h3>
															</div>
														</div>
														<div className="tg-matchhover">
															<address>Jan16, 2017 15:30 PM Soccer Stadium, Dubai</address>
															<div className="tg-btnbox">
																<a className="tg-btn" href="#"><span>read more</span></a>
																<a className="tg-btn" href="#"><span>book my ticket</span></a>
															</div>
														</div>
													</div>
												</div> */}
											</div>
											<div className="tg-themebtnnext"><span className="fa fa-angle-down"></span></div>
											<div className="tg-themebtnprev swiper-button-disabled"><span className="fa fa-angle-up"></span></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
            </div>
            <Outlet />
			</section>
    )
};

export default Fixtures;