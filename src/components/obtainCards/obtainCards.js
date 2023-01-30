
import './obtainCards.css';
import card from '../../imgs/card.png';
import { useEffect, useState } from 'react';
import { addDoc, collection, getDocs, where, query, doc, updateDoc } from 'firebase/firestore';
import { firestoreDB } from '../../service/firebase';
import LoadingSpinner from '../loader/loader';
import { Link } from 'react-router-dom';

const ObtainCards = (props) => {

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
        const userMail = query(collection(firestoreDB, 'users'), where('email', '==', props.userData.email));
        getDocs(userMail)
            .then(res => {
                const obtains = res.docs.map(doc => {
                    return { id: doc.id, ...doc.data() }
                })
                setObtains(obtains);
            })
        }, [props.userData.email])


    const BackToObtain = () => {

        const y = obtains[0].obtains - 1;

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

        const decremetRef = doc(firestoreDB, "users", "ngaQFYSgpKSGkp2n9h1BoSfDA363");

        updateDoc(decremetRef, {
            obtains: y
        });

        return (
            <div className='obtainCards-container'>
                {theCard.map(c => <div key={c.id}>
                    <h2>{c.name}</h2>
                    <img src={image} alt=""></img>
                    <p>{c.desc}</p>
                </div>)}
                <Link to="/Mycards"><button>Great!</button></Link>
            </div>
        )

    }

    const Obtain = () => {
        if (props.userData.uid === null) {

            return (
                <div className='obtainCards-container-out'>
                    <h2>please create an account or log in to get cards</h2>
                </div>
            )
        } else {
            return (
                <div className='obtainCards-container'>
                    <h2>you can get up to 10 cards a day!</h2><br></br><br></br>
                    <div>
                        <img src={card} alt=""></img>
                    </div>
                    <button onClick={() => setShow(!show)}>get cards</button>
                </div>
            )
        }
    }

    if (cards.length === 0) {
        return (
            <div className='obtainCards'>
                <div className='obtainCards-container-out'>
                    <LoadingSpinner></LoadingSpinner>
                </div>
            </div>
        )
    } else {
        return (
            <div className='obtainCards'>
                {show ? <Obtain /> : <BackToObtain />}
            </div>
        )
    }

}

export default ObtainCards;
