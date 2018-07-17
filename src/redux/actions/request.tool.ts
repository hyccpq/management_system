import { Dispatch } from "../../../node_modules/redux";
import { loadingState, EnthusiasmAction } from ".";
import axios from '../../util/axios'

export interface ReqConf {
    method: string;
    url: string;
    params?: {};
    data?: {};
}

export default abstract class HttpRequest<T extends EnthusiasmAction, U extends EnthusiasmAction> {
    protected successCb: (data) => T;
    protected errorCb: (mag) => U;
    protected reqConf: ReqConf;

    constructor(reqConf: ReqConf){
        this.reqConf = reqConf;
    }

    /**
     * computedLoadState
     */
    protected computedLoadState = (dispatch: Dispatch<EnthusiasmAction>) => (loadState:boolean) => dispatch(loadingState(loadState));

    public reqInf = async (
        dispatch: Dispatch<EnthusiasmAction>
    ) => {
        try {
            let res = await axios(
                this.computedLoadState(dispatch)
            )(this.reqConf);
    
            if(res.data.status === 0) {
                dispatch(this.successCb(res.data.data))
            } else {
                throw res.data.msg
            }
        } catch (error) {
            console.log(error);

            if(this.errorCb) {
                dispatch(this.errorCb(error))
            }
        }
    }
}
