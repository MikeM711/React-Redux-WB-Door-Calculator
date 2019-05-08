import {
  FETCH_WIDGETS_DB,
  ADD_WIDGET_DB,
  DELETE_WIDGET_DB,
  UPDATE_WIDGET_DB,
  ADD_WIDGET_USER_HISTORY,
  DELETE_WIDGET_USER_HISTORY,
  CALCULATE_USER_HISTORY
} from '../actions/types'

const initState = {
  widgets: [],
  userHistory: [],
  userHistTotal: '',
}

function widgetReducer(state = initState, action) {
  switch (action.type) {
    case FETCH_WIDGETS_DB:
      console.log('[WidgetReducer] got a FETCH_WIDGETS_DB action')
      return { ...state, widgets: [...state.widgets, action.payload] }
    case ADD_WIDGET_DB:
      console.log('[WidgetReducer] got a ADD_WIDGET_DB action')
      return {...state, widgets: [...state.widgets, action.payload] }
    case DELETE_WIDGET_DB:
      console.log('[WidgetReducer] got a DELETE_WIDGET_DB action')
      const filterWidgets = deleteWgtDB(action.payload,state)
      return {...state, widgets: filterWidgets}
    case UPDATE_WIDGET_DB:
      console.log('[WidgetReducer] got a UPDATE_WIDGET_DB action')
      console.log('action.payload',action.payload)
      const updatedWidgets = findAndReplace(action.payload,state)
      console.log(updatedWidgets)
      return {...state, widgets: updatedWidgets}
    case ADD_WIDGET_USER_HISTORY:
      console.log('[WidgetReducer] got a ADD_WIDGET_USER_HISTORY action')
      const newWidget = addWidget(action.payload, state)
      return { ...state, userHistory: [...state.userHistory, newWidget] }
    case DELETE_WIDGET_USER_HISTORY:
      console.log('[WidgetReducer] got a DELETE_WIDGET_USER_HISTORY action')
      const filterHistory = deleteWgtHist(action.payload, state)
      return { ...state, userHistory: filterHistory }
    case CALCULATE_USER_HISTORY:
      const sumHistory = wgtHistTotal(state.userHistory)
      return { ...state, userHistTotal: sumHistory }
    default:
      return state
  }
}

const findAndReplace = (updatedItem, state) => {

  const widgetsCopy = state.widgets.slice();

  widgetsCopy.forEach((currValue, idx) => {
    if (currValue.id === updatedItem.id) {
      widgetsCopy.splice(idx, 1, updatedItem);
    }
  });

  return widgetsCopy;
};

const deleteWgtDB = (id, state) => {
  const newWidgetList = state.widgets.filter(widget => {
    return id !== widget.id
  })
  return newWidgetList
}

const wgtHistTotal = (userHistory) => {
  let sumHistory = {
    alum: 0,
    crSteel: 0,
    galv: 0,
    glass: 0,
    sSteel: 0,
  }

  userHistory.forEach(singleHis => {
    sumHistory.alum += singleHis.alum
    sumHistory.crSteel += singleHis.crSteel
    sumHistory.galv += singleHis.galv
    sumHistory.glass += singleHis.glass
    sumHistory.sSteel += singleHis.sSteel
  })

  return sumHistory
}

// Finds the widget in user's history, deletes it, returns a new filtered array
const deleteWgtHist = (id, state) => {
  const newHistory = state.userHistory.filter(widgetInfo => {
    return widgetInfo.id !== id
  })
  return newHistory
}

// Function for converting payload into a proper "widget" Reducer value
const addWidget = (payload, state) => {

  // Initialize object properties
  let initProps = {
    widgetSelect: payload.widgetSelect,
    qtySelect: payload.qtySelect,
    alum: 0,
    crSteel: 0,
    galv: 0,
    glass: 0,
    sSteel: 0,
  }

  // Find all the information about the current widget the User has clicked
  let stateWgtInfo = state.widgets.find(wgtInfo => {
    return payload.widgetSelect === wgtInfo.widget
  })

  // Combine all information about current widget with initialized properties
  const calcWgt = Object.assign(initProps, stateWgtInfo)

  // We want the id from the Form (random integer), not the id from the widgets list
  calcWgt.id = payload.id

  calcWgt.alum = calcWgt.alum * payload.qtySelect
  calcWgt.crSteel = calcWgt.crSteel * payload.qtySelect
  calcWgt.galv = calcWgt.galv * payload.qtySelect
  calcWgt.glass = calcWgt.glass * payload.qtySelect
  calcWgt.sSteel = calcWgt.sSteel * payload.qtySelect

  return calcWgt
}

export default widgetReducer