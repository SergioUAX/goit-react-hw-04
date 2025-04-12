import ClipLoader from "react-spinners/ClipLoader";
import styles from "./Loader.module.css";

export const Loader = () => { 
    return (
        <div className={styles.loader}>
            <ClipLoader 
                color={'#3949ab'}                
                size={50}                
            />
        </div>
    )
};