import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AddTeam = (props) => {
    const navigate = useNavigate();
    const configs = useSelector(state => state.config.config);
    const [category, setCategory] = useState([]);
    const [teams, setTeams] = useState([]);
    const [isNameExists, setIsNameExists] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // reference 
    const categoryRef = useRef();
    const teamNameRef = useRef();

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
            setTeams(teamDetails.data.teams.map(team => team.name))
        } 
    }

    const onChangeCategoryHandler = (evt) => {
        fetchCategory(categoryRef.current.value);
    }

    const onBlurTeamNameHandler = (evt) => {
        if (teams.indexOf(teamNameRef.current.value) > -1) {
            setIsNameExists(true);
        } else {
            setIsNameExists(false);
        }
    }

    const onFormSubmitHandler = async(evt) => {
        evt.preventDefault();
        const payLoad = {
            name: teamNameRef.current.value,
            category: categoryRef.current.value
        };
        const authToken = localStorage.getItem('authToken');
        const response = await fetch(configs.TEAMS, {
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
            setIsSuccess(true);            
            console.log(payLoad)
        }
    }

    const addNew = () => {
        setIsSuccess(false);
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchCategory();
        }, 1500);
        return () => {
            clearTimeout(timeoutId);
        }
    }, [])

    return (
        <section className="tg-main-section tg-haslayout">
            <div className="container">
                <div class="tg-section-name">
                    <h2>Add Team</h2>
                </div>
                <div class="col-sm-11 col-xs-11 pull-right">
                    {isSuccess && <div class="tg-posttitle" style={{ 'textTransform':'none', 'textAlign': 'center'}}>
                        <h3>
                            <a href="#">Updated successfully! <button onClick={addNew}>Add More Team</button></a> 
                        </h3>
                    </div>}
                    {!isSuccess && <form class="tg-commentform help-form" id="tg-commentform" onSubmit={onFormSubmitHandler}>
                        <fieldset>
                            <div class="form-group" >
                                <div class="tg-select">
                                    <select name="contact[type]" ref={categoryRef} onChange={onChangeCategoryHandler}>
                                        <option value="">Select Category*</option>
                                        {
                                            category && category.length && category.map(cat => {
                                                return (
                                                    <option key={cat._id} value={cat._id}>{cat.description}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <input type="text" required="" placeholder="Team Name*" class="form-control" name="contact[name]" ref={teamNameRef} onBlur={onBlurTeamNameHandler} />
                                {isNameExists && <p>Team name already exists</p>}
                            </div>
                            <div class="form-group">
                                <button type="submit" class="tg-btn">Add</button>
                            </div>
                        </fieldset>
                    </form>
                    }
                </div>
            </div>
        </section>
    );
};

export default AddTeam;