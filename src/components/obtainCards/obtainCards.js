
import './obtainCards.css';
import card from '../../imgs/card.png';
import UserContext from '../../usercontext/usercontext';
import { useContext, useEffect, useState } from 'react';
import { addDoc, collection, getDocs, where, query, doc, updateDoc } from 'firebase/firestore';
import { firestoreDB } from '../../service/firebase';
import LoadingSpinner from '../loader/loader';
import { Link } from 'react-router-dom';

const ObtainCards = (props) => {

    //const { userInfo } = useContext(UserContext);
    const [cards, setCards] = useState([]);
    const [show, setShow] = useState(true);
    const [obtains, setObtains] = useState();
    const min = 2;
    const max = 10;


    useEffect(() => {
        
        let level = Math.floor(Math.random() * (max - min) + min);

        fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?level=${level}`)
            .then((res) => res.json())
            .then((data) => {
                const e = data.data;
                setCards(e);
            })
            const userMail = query(collection(firestoreDB, 'users'), where('email', '==', props.userData.uid));
            getDocs(userMail)
            .then(res => {
                 const obtains = res.docs.map(doc => {
                    return {id: doc.id, ...doc.data()}
                })
                setObtains(obtains);
            })
            
        
    }, [props.userData.uid])

    const BackToObtain = () => {

        //const y = obtains[0].obtains - 1;

        //console.log("ee", y);

        const uid = props.userData.uid;

        const email = props.userData.email;

        let randomCart = Math.floor(Math.random() * (99 - 1) + 1);

        const theCard = [cards[randomCart]];

        const image = theCard[0].card_images[0].image_url;

        addDoc(collection(firestoreDB, "cards"), {
            uid: uid,
            email: email,
            name: theCard[0].name,
            attribute: theCard[0].attribute,
            atk: theCard[0].atk,
            def: theCard[0].def,
            image: image
        });

        /*const decremetRef = doc(firestoreDB, "users", "ngaQFYSgpKSGkp2n9h1BoSfDA363");

        updateDoc(decremetRef, {
            obtains: y
        });*/

        return (
            <div className='obtainCards-container'>
                {theCard.map(c => <div key={c.id}>
                    <h2>{c.name}</h2>
                    <img src={image} alt=""></img>
                    <p>{c.desc}</p>
                </div>)}
                <Link to='/ObtainCards'><button onClick={() => setShow(!show)}>Great!</button></Link>
            </div>
        )

    }

    const Obtain = () => {
        console.log(obtains);
        if (props.userData.uid === null) {
            return (
                <div className='obtainCards-container-out'>
                    <h2>Please make a account or enter if you have one to obtain carts!!</h2>
                </div>
            )
        } else {
            return (
                <div className='obtainCards-container'>
                    <h2>En esta seccion puedes obtener una carta a la vez hasta 10 veces al dia!</h2>
                    <div>
                        <img src={card} alt=""></img>
                    </div>
                    <button onClick={() => setShow(!show)}>Obtener cartas</button>
                </div>
            )
        }
    }
    
    if (cards.length === 0) {
        return (
            <div>
                <LoadingSpinner></LoadingSpinner>
            </div>
        )
    } else {
        return (
            <div className='obtainCards'>
                {show ? <Obtain/> : <BackToObtain />}
            </div>
        )
    }

}

export default ObtainCards;
