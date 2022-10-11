// log
import store from "../store";

const fetchDataRequest = () => {
  return {
    type: "CHECK_DATA_REQUEST",
  };
};

const fetchDataSuccess = (payload) => {
  return {
    type: "CHECK_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchDataFailed = (payload) => {
  return {
    type: "CHECK_DATA_FAILED",
    payload: payload,
  };
};

export const fetchData = () => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      let totalSupply = await store
        .getState()
        .blockchain.smartContract.methods.totalSupply()
        .call();
    //cambiaar el contrato para que retorne el array de la whitelist
      let whitelisted = await store
        .getState()
        .blockchain.smartContract.methods.whitelisted(await store.getState().blockchain.account)
        .call();
        console.log("esto es de data "+ await store.getState().blockchain.account);
      let cost = await store
         .getState()
         .blockchain.smartContract.methods.cost()
         .call();
      
      dispatch(
        fetchDataSuccess({
          totalSupply,
          whitelisted,
          cost,
        })
        
      );
      console.log(Boolean(whitelisted));
    } catch (err) {
      console.log(err);
      dispatch(fetchDataFailed("Could not load data from contract."));
    }
  
  };
};
