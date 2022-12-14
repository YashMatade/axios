import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Checkbox } from 'semantic-ui-react'

const Products = () => {
    const [alldata, setAllData] = useState();
    const [Name, setName] = useState('');
    const [Description, setDescription] = useState('');
    const [Post_Ids, setPost_Ids] = useState([]);

    useEffect(() => {
        axios({
            method: 'post',
            url: "https://fxojmluid9.execute-api.ap-south-1.amazonaws.com/Prod/api/engt/getfeeds_v1",
            headers: {
                "X-api-key": "MXqO3cDcr492OTPGZZAot7akPvLmfKbA4bKt5Ryr",
                "X-tenant-key": "DIVANOR123",
            },
            data: {
                "Index": 1,
                "ContentType": [2]
            }
        }).then((res) => {
            setAllData(res.data.data.Feeds);
            console.log(res.data.data.Feeds);
        }, (err) => {
            console.log(err);
        })
    }, []);

    function handleChange(e) {
        const { checked, value } = e.target;
        if (checked) {
            setPost_Ids([...Post_Ids, value]);
        } else {
            setPost_Ids([Post_Ids.filter((e) => e !== value)]);
        }
    }


    function createPlaylist(e) {
        e.preventDefault();
        if (Name === "") {
            alert('Enter Name');
        }
        else if (Description === "") {
            alert('Enter Description');
        } else {
            alert('playlist created successfully');
            axios({
                method: 'post',
                url: "https://fxojmluid9.execute-api.ap-south-1.amazonaws.com/Prod/api/engt/getfeeds_v1",
                headers: {
                    "X-api-key": "MXqO3cDcr492OTPGZZAot7akPvLmfKbA4bKt5Ryr",
                    "X-tenant-key": "DIVANOR123",
                },
                data: {
                    "PlayListId": 0,
                    "Post_Ids": Post_Ids,
                    "Name": Name,
                    "Description": Description
                }
            }).then((res) => {
                console.log(res);
                alert(res);
            }, (err) => {
                console.log(err);
            })
        }

    }


    if (alldata !== undefined) {
        return (
            <>
                <div className="container mt-3">
                    <div className="row">
                        <div className="col-lg-4"><input type="text" placeholder='PlayList Name'
                            onChange={(e) => setName(e.target.value)}
                        /></div>
                        <div className="col-lg-4"><input type="text" placeholder='Description'
                            onChange={(e) => setDescription(e.target.value)}

                        /></div>
                        <div className="col-lg-4"><button className='btn btn-primary' onClick={(e) => { createPlaylist(e) }}>Create Playlist</button></div>
                        {
                            alldata.map((data, key) => {
                                return <div className="col-lg-3 mt-2">
                                    <div className="card" style={{ width: "11rem" ,height:"20rem" }}>
                                        <input class="form-check-input" type="checkbox" value={data.EngagementPostId} onChange={(e) => { handleChange(e) }} id="flexCheckChecked" />
                                        <label class="form-check-label" htmlFor="flexCheckChecked">
                                            <img src={data.Thumbnail_URL} className="card-img-top" alt="..." />
                                            <div className="card-body">
                                                <h5 className="card-title">{data.Thumbnail_Title}</h5>
                                                <p className="card-text"></p>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </>
        )
    } else {
        return <div>waiting...</div>
    }

}

export default Products;
