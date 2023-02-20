import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AddPlayer = (props) => {
    const navigate = useNavigate();
    const configs = useSelector(state => state.config.config);
    const [showSuccess, setShowSuccess] = useState(false);
    const [category, setCategory] = useState([]);
    const [teamInfo, setTeamInfo] = useState([]);
    const [relation, setRelation] = useState(['Father', 'Mother', 'Other']);

    //ref 
    const categoryRef = useRef();
    const teamRef = useRef();
    const playerRef = useRef();
    const classRef = useRef();
    const sectionRef = useRef();
    const dobRef = useRef();
    const relationRef = useRef();
    const nameRef = useRef();
    const addressRef = useRef();
    const mobileRef = useRef();
    const genderRef = useRef();
    
    const fetchCategory = useCallback(async () => {
        const categoryResponse = await fetch(configs.CATEGORY);
        if (categoryResponse.ok) {
            const categories = await categoryResponse.json();
            setCategory(categories.data);
            if (category.length) {
                fetchTeams(category[0]._id);
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
            setTeamInfo(teamDetails.data.teams)
        } 
    }

    const onChangeCategoryHandler = (evt) => {
        console.log(categoryRef.current.value)
        fetchTeams(categoryRef.current.value);
    }

    const onChangeTeam = () => {

    }

    const onChangeRelationHandler = () => {

    }

    const onFormSubmitHandler = async(evt) => {
        evt.preventDefault();
        let name = playerRef.current.value.split(" ");
        const payLoad = {
            "name": {
                "first": name[0],
                "last": name[1]
            }, 
            "class": classRef.current.value,
            "section": sectionRef.current.value,
            "dob": dobRef.current.value,
            "category": categoryRef.current.value,
            "team": teamRef.current.value,
            "gender": genderRef.current.value,
            "guardian": {
                "relation": relationRef.current.value,
                "name": nameRef.current.value,
                "mobile": mobileRef.current.value,
                "address": addressRef.current.value
            }
        }
        const authToken = localStorage.getItem('authToken');
        const response = await fetch(configs.PLAYERS, {
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
            setShowSuccess(true);
            // setTimeout(() => {
            //     navigate("/fixtures");   
            // }, 2000);
        }
        console.log(payLoad)

    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchCategory();
        }, 500);
        return () => {
            clearTimeout(timeoutId);
        }
    }, [])
    return (
        <section className="tg-main-section tg-haslayout">
            <div className="container">
                <div class="tg-section-name">
                    <h2>Add Player</h2>
                </div>
                <div class="col-sm-11 col-xs-11 pull-right">
                    {showSuccess && <div class="tg-posttitle" style={{ 'textTransform':'none', 'textAlign': 'center'}}>
                        <h3>
                            <a href="#">Updated successfully!</a>
                        </h3>
                    </div>}
                    {!showSuccess && <form class="tg-commentform help-form" id="tg-commentform" onSubmit={onFormSubmitHandler}>
                        <fieldset>
                            <div class="form-group">
                                <div class="tg-select">
                                    <select name="contact[type]" ref={categoryRef} style={{ 'width': '100%', "margin-rigth": "20px" }} onChange={onChangeCategoryHandler}>
                                        <option value="">Select Category</option>
                                        {
                                            category.length && category.map(cat => {
                                                return <option key={cat.id} value={cat.id}>{cat.title} - {cat.description}</option>;
                                            })
                                        }
                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="tg-select">
                                    <select name="contact[type]" style={{ 'width': '100%', "margin-rigth": "20px" }} ref={teamRef} onChange={onChangeTeam}>
                                        <option value="">Select Team</option>
                                        {teamInfo && teamInfo.length && teamInfo.map(team => {
                                            return <option key={team._id} value={team._id}>{team.name}</option>
                                        })}
                                    </select>
                                </div>
                            </div>


                            <div class="form-group">
                                <input type="text" required="" placeholder="Player Name*" class="form-control" name="contact[name]" ref={playerRef} />
                            </div>
                            <div class="form-group">
                                <input type="text" required="" placeholder="Class* (1, 2, 3, 4, 5)" class="form-control" name="contact[name]" style={{ 'width': '48%', "margin-rigth": "20px" }} ref={classRef} />
                                <input type="text" required="" placeholder="Section* (A, B, C)" class="form-control" name="contact[name]" style={{ 'width': '48%', "margin-rigth": "20px", "float": "right" }} ref={sectionRef} />                               
                            </div>
                            <div className="form-group">
                                <input type="text" required="" placeholder="DOB* (mm-dd-yyyy)" class="form-control" name="contact[name]" style={{ 'width': '48%', "margin-rigth": "20px" }} ref={dobRef} />
                                <div class="tg-select" style={{ 'width': '48%', "margin-rigth": "20px", "float":"right" }}>
                                    <select name="contact[type]" ref={genderRef} onChange={onChangeRelationHandler}>
                                        <option value="">Select Gender</option>
                                        <option value="Boy">Boy</option>
                                        <option value="Girl">Girl</option>
                                    </select>
                                </div>
                            </div>
                            <div class="tg-posttitle" style={{ 'textTransform': 'none', 'textAlign': 'center' }}>
                                <h3>
                                    <a href="#">guardian</a>
                                </h3>
                            </div>
                            <div class="form-group">
                                <div class="tg-select" style={{ 'width': '49%', "margin-rigth": "20px" }}>
                                    <select name="contact[type]" ref={relationRef} onChange={onChangeRelationHandler}>
                                        <option value="">Select Relation</option>
                                        {
                                            relation.length && relation.map(rel => {
                                                return <option key={rel} value={rel}>{rel}</option>;
                                            })
                                        }
                                    </select>
                                </div>
                                <input type="text" required="" placeholder="Name" class="form-control" name="contact[name]" style={{ 'width': '48%', "margin-rigth": "100px", "float": "right" }} ref={nameRef} />
                            </div>
                            <div class="form-group">
                                <input type="text" required="" placeholder="Mobile" class="form-control" name="contact[name]" style={{ 'width': '48%', "margin-rigth": "100px", "float": "left" }} ref={mobileRef} />
                                <input type="text" required="" placeholder="Address" class="form-control" name="contact[name]" style={{ 'width': '48%', "margin-rigth": "100px", "float": "right" }} ref={addressRef} />
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

export default AddPlayer;