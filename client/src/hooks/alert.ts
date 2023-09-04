import { useContext } from "react";
import { alertContext } from "contexts";

const useAlert = () => {
    const alertInstance = useContext(alertContext)
    return [alertInstance.info, alertInstance.setInfo] as const;
}
 
export default useAlert;