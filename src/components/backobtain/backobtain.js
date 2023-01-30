import './backobtain.css';
import { Link, useParams } from 'react-router-dom';
import { addDoc, getDocs, query, collection, where, doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { firestoreDB } from '../../service/firebase';
import LoadingSpinner from '../loader/loader';

const BackToObtain = (props) => {

    const [cards, setCards] = useState([]);
    const [obtains, setObtains] = useState();
    const min = 2;
    const max = 10;
    const { uid } = useParams();

    useEffect(() => {
        (async () => {
            let level = Math.floor(Math.random() * (max - min) + min);

            await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?level=${level}`)
                .then((res) => res.json())
                .then((data) => {
                    const e = data.data;
                    setCards(e);
                })
            const userMail = await query(collection(firestoreDB, 'users'), where('email', '==', uid));
            await getDocs(userMail)
                .then(res => {
                    const obtains = res.docs.map(doc => {
                        return { id: doc.id, ...doc.data() }
                    })
                    setObtains(obtains);
                })
        })()
    }, [uid])

    const y = obtains;
    const email = props.userData.email;
    let randomCart = Math.floor(Math.random() * (99 - 1) + 1);
    const theCard = [cards[randomCart]];

    addDoc(collection(firestoreDB, "cards"), {
        uid: uid,
        email: email,
        name: theCard[0].name,
        attribute: theCard[0].attribute,
        atk: theCard[0].atk,
        def: theCard[0].def,
    });

    const decremetRef = doc(firestoreDB, "users", "ngaQFYSgpKSGkp2n9h1BoSfDA363");

    updateDoc(decremetRef, {
        obtains: y
    });

    if (cards.length === 0) {
        return (
            <div className='obtainCards'>
                <LoadingSpinner></LoadingSpinner>
            </div>
        )
    } else {
        return (
            <div className='obtainCards-container'>
                {theCard.map(c => <div key={c.id}>
                    <h2>{c.name}</h2>
                    <img src="" alt=""></img>
                    <p>{c.desc}</p>
                </div>)}
                <Link to='/ObtainCards'><button>Great!</button></Link>
            </div>
        )
    }
}

export default BackToObtain;