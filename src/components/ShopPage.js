import React, { useState, useEffect } from "react";

import luffy from '../images/Luffy.webp';
import zoro from '../images/Zoro.webp';
import sanji from '../images/Sanji.webp';
import nami from '../images/Nami.webp';
import usopp from '../images/Usopp.webp';
import chopper from '../images/Chopper.webp';
import robin from '../images/Robin.webp';
import franky from '../images/Franky.webp';
import jinbe from '../images/Jinbe.webp';
import brook from '../images/Brook.webp';

const posters = [
    {
        name: "Luffy Poster",
        image: luffy,
        id: 0
    },
    {
        name: "Zoro Poster",
        image: zoro,
        id: 1
    },
    {
        name: "Sanji Poster",
        image: sanji,
        id: 2
    },
    {
        name: "Nami Poster",
        image: nami,
        id: 3
    },
    {
        name: "Usopp Poster",
        image: usopp,
        id: 4
    },
    {
        name: "Chopper Poster",
        image: chopper,
        id: 5
    },
    {
        name: "Robin Poster",
        image: robin,
        id: 6
    },
    {
        name: "Franky Poster",
        image: franky,
        id: 7
    },
    {
        name: "Brook Poster",
        image: brook,
        id: 8
    },
    {
        name: "Jinbe Poster",
        image: jinbe,
        id: 9
    }
]

const Form = (props) => {
    const { inputValue, handleInput, incrementInput, decrementInput, handleSubmit } = props.props

    return (
        <form data-name={props.poster.name} data-id={props.poster.id} onSubmit={handleSubmit}>
            <div>
                <button type="button" onClick={decrementInput}>-</button>
                <input 
                value={inputValue}
                onChange={handleInput}
                />
                <button type="button" onClick={incrementInput}>+</button>
            </div>
            <div>
                <button type="submit">Add</button>
                <button type="button" onClick={props.cancel}>Cancel</button>
            </div>
        </form>
    )
}

export default function Shop (props) {
    const [formView, setFormView] = useState({
        showForm: false,
        formID: null,
    });
    
    const handleAddItem = (e) => {
        setFormView({
          showForm: true,
          formID: e.target.dataset.id
        });
    }

    const handleCancel = () => {
        setFormView({
            showForm: false,
            formID: null,
        })
    }
    
    useEffect(() => {
        setFormView({
            showForm: false,
            formID: null,
          })
    }, [props.cartItems]);

    
    return (
        <div id="shop-page">
            <h1>Shop</h1>
            <div id="catalog">
                <h2>Posters</h2>
                <div>
                    {
                        posters.map(poster => {
                            return (
                                <div key={poster.id} className='card'>
                                    <img 
                                    src={poster.image}
                                    alt={poster.name}
                                    className='card-img'
                                    />
                                    <span>{poster.name}</span>
                                    <span>$0.99</span>
                                    <button type='button' data-id={poster.id} onClick={handleAddItem}>Add to cart</button>
                                    {
                                        (formView.showForm === true && Number(formView.formID) === poster.id) ? <Form props={props} poster={poster} cancel={handleCancel}/> : ''
                                    }
                               </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

<Form />
