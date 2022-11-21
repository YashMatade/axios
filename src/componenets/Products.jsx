import React, { useEffect, useState } from 'react'
import axios from 'axios';
const Products = () => {
    const [alldata, setAllData] = useState();
    const [playList, setPlaylist] = useState({
        "PlayListId": 0,
        "Post_Ids": [],
        "Name": "",
        "Description": ""
    });

    // axios.post

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
        e.preventDefault();
        const newPlaylist = { ...playList };
        newPlaylist[e.target.id] = e.target.value;
        setPlaylist(newPlaylist);
    }

    useEffect(() => {
        axios({
            method: 'post',
            url: "https://fxojmluid9.execute-api.ap-south-1.amazonaws.com/Prodapi/engt/createPlayList",
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
    }, [])

    if (alldata !== undefined) {
        return (
            <>
                <div className="container mt-3">
                    <div className="row">
                        <div className="col-lg-4"><input type="text" id='Name' placeholder='PlayList Name' onChange={(e) => handleChange(e)} /></div>
                        <div className="col-lg-4"><input type="text" id='Description' placeholder='Description' onChange={(e) => handleChange(e)} /></div>
                        <div className="col-lg-4"><button className='btn btn-primary'>createplaylist</button></div>
                        {
                            alldata.map((data, key) => {
                                return <div className="col-lg-3 mt-2">
                                    <div className="card" style={{ width: "11rem" }}>
                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                        <label class="form-check-label" for="flexCheckChecked">
                                            <img src={data.Thumbnail_URL} className="card-img-top" alt="..." />

                                            <div className="card-body">
                                                <h5 className="card-title">{data.Thumbnail_Title}</h5>
                                                <p className="card-text">{data.EngagementPostId}</p>
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
