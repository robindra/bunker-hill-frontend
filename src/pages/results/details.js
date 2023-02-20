const Details = (props) => {
    return (
        
        props.played && <div role="tabpanel" class="tab-pane fade in active" id="one">
            <div class="tg-matchresult">
                <div class="tg-box">
                    <div class="tg-score"><h3>{props.pdp.goals.team1} - {props.pdp.goals.team2 }</h3></div>
                    <div class="tg-teamscore">
                        <strong class="tg-team-logo">
                            <a href="#"><img src="images/team-logo/logo-01.png" alt="image description" /></a>
                        </strong>
                        <div class="tg-team-nameplusstatus">
                            <h4>
                                <a href="#">
                                    {props.teams.team1.name}
                                    {props.played && props.pdp.goals.team1 > props.pdp.goals.team2 && ' (WIN)'}
                                    {props.played && props.pdp.goals.team1 < props.pdp.goals.team2 && ' (LOSS)'}
                                    {props.played && props.pdp.goals.team1 == props.pdp.goals.team2 && " (TIE)"}
                                </a>
                            </h4>
                        </div>
                        {/* <ul class="tg-playernameplusgoadtime">
                            <li>Roman Fenley (15)</li>
                            <li>Miguel Beckel (19)</li>
                            <li>Jonah Jolicoeur (39)</li>
                            <li>Connie Harland (48)</li>
                        </ul> */}
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
                                    {props.teams.team2.name}
                                    {props.played && props.pdp.goals.team1 < props.pdp.goals.team2 && " (WIN)"}
                                    {props.played && props.pdp.goals.team1 > props.pdp.goals.team2 && " (LOSS)"}
                                    {props.played && props.pdp.goals.team1 == props.pdp.goals.team2 && " (TIE)"}
                                </a>
                            </h4>
                        </div>
                        {/* <ul class="tg-playernameplusgoadtime">
                            <li>Ethan Ryberg (22)</li>
                            <li>Wilbert Delbosquel (27)</li>
                            <li>Maynard Brabant (42)</li>
                        </ul> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Details;