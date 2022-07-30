import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { ActionCreatorsMapObject, bindActionCreators } from "@reduxjs/toolkit";

export function useActions<T extends ActionCreatorsMapObject>(actions: T) {
  const dispatch = useDispatch();
  return useMemo(() => {
    return bindActionCreators(actions, dispatch);
  }, [dispatch, actions]);
}
