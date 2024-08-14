import { all } from "redux-saga/effects";
import userSaga from "./userSaga";
import { authSaga } from "./authSaga";
import { caseSaga } from "./caseSaga";
import { premisesSaga } from "./premisesSaga";
import { clientSaga } from "./clientSaga";
import { utilsSaga } from "./utilsSaga";
import { stagesSaga } from "./stagesSaga";
import { taskSaga } from "./taskSaga";

export default function* rootSaga() {
  yield all([userSaga(), authSaga(), caseSaga(), premisesSaga(), clientSaga(), utilsSaga(), stagesSaga(),taskSaga()]);
}
