# LifeTrackr

**Lifetrackr** is a cross-platform mobile app created using React Native framework. The goal of this app is to offer functionality that aids in the process of taking care of plants and animals. The app will allow the addition of companions (a plant or animal), with any number of events which represent the tasks linked to a companion to keep it alive and healthy.

## Prerequisites

Install the below tools/packages

| Serial No | Software         | Version   | Serial No                                                                  |
| :-------- | :--------------- | :-------- | :------------------------------------------------------------------------- |
| 1         | Node.js          | >= 6.9.1  | [Install Node.js](https://nodejs.org/en/download/)                         |
| 2         | npm              | >= 3.10.8 | [Install NPM](https://www.npmjs.com/get-npm)                               |
| 3         | react-native     | >= 0.51.0 | [Install react-native](https://www.npmjs.com/package/react-native)         |
| 4         | react-native-cli | >= 2.0.1  | [Install react-native-cli](https://www.npmjs.com/package/react-native-cli) |
| 5         | Expo             | >= 47.1.1 | [Install Expo](https://www.npmjs.com/package/expo)                         |

## Installation

Install Lifetrackr with npm

**System setup**

- Clone the repo with `git clone [REPO_URL] `
- Switch to the project's root directory in terminal
- Install the dependencies by running`npm install`
- Once, 'npm install' is completed, start the expo and react-native server by running `expo start `
- If it shows a QR code on the terminal as a result of 'expo start' command, then you are good to go!

Ignore the first step on 'Mobile setup' instructions given below if you already have 'Expo' app installed on your phone.

**Mobile setup**

- Install 'Expo' application on your android/iOS device. You can find the links to Android and iOS apps here.
- Scan the QR code shown on the terminal.
- Once the QR code is successfully scanned, it will take few seconds to load and render the app.

## Base dependencies

- [redux-saga](https://redux-saga.js.org/) as a state manager.
- [axios](https://github.com/axios/axios) for networking (HTTP Requests).
- [react-navigation](https://reactnavigation.org/) navigation library.
- [expo-secure-store](https://docs.expo.dev/versions/latest/sdk/securestore/) as secure storage solution
- [MaterialDesignIcons](https://materialdesignicons.com/) as icons package
- [formik](https://formik.org/docs/overview) for creating and handling input forms
- [moment](https://momentjs.com/) as date and time formatter
- [yup](https://www.npmjs.com/package/yup) for validating data in text input fields

## API Reference (Example)

#### Get all users

```
  GET /api/users
```

| Parameter | Type | Description                                  |
| :-------- | :--- | :------------------------------------------- |
| `-`       | `-`  | Get a list of all users (no params required) |

#### Modify a companion

```
  POST users/companions/${id}/
```

| Parameter      | Type      | Description                             |
| :------------- | :-------- | :-------------------------------------- |
| `companion id` | `integer` | **Required**. Id of companion to modify |

#### Check if it is triggered

```
  GET companions/event/last_complete/{event_id}/
```

| Parameter  | Type      | Description                        |
| :--------- | :-------- | :--------------------------------- |
| `event id` | `integer` | **Required**. Id of event to fetch |

## Redux Saga

Once the components are defined, they are tied to the management of information through the application. For this, Redux is implemented with the store-reducer-action structure as usual, however, not only the data is handled through the actions but the success and error responses are also defined by the same form.

**Root Saga files and API connection handler**

To keep the networking layer simple, we use Axios dependency to make HTTP requests in the files in "requests" folder. Files in "handlers" folders uses interceptors to define common side effects for the responses.

When you need communication with a service you have to create a function to manage the operation and grouping according to the kind of reducers inside a RootSaga.js file.

While the data transfer between the API and the app is working you must use the success and error actions that help you to catch the result of the operation. With this method, you can track the interaction through the redux saga store. This is useful because you can create behaviors based on those states in a quick and simple way

**Redux folders**

These files/folders divide the Redux Saga work

- **configureStore.js**: Here you define the store shape and you can configure the companions and users reducers, and middlewares.
- **rootSaga.js**: A root Saga aggregates multiple Sagas to a single entry point for the sagaMiddleware to run. the `watcherSaga` effect is used with an array and your sagas (`takeLatest()`) will be executed in parallel.
- **reducers (folder)**: You have the error and success reducers by default. Create the other classifications and try to keep simple each file. Here you modify the store.
- **handlers**: files in this folder catch side effects and errors and return responses to the reducers (errors/success)
- **requests**: files with `HTTP Requests` (functions) using Axios dependency

## Color Reference

| Components     | Hex                                                              |
| -------------- | ---------------------------------------------------------------- |
| Background     | ![#ECF0F3](https://via.placeholder.com/10/ecf0f3?text=+) #ECF0F3 |
| Text and Icons | ![#3F4A62](https://via.placeholder.com/10/3F4A62?text=+) #3F4A62 |
| Underline Text | ![#748492](https://via.placeholder.com/10/748492?text=+) #748492 |
| Search Bar     | ![#E3E6EC](https://via.placeholder.com/10/E3E6EC?text=+) #E3E6EC |

## Authors

- [Shermuhammad Kosimi ](https://github.com/sherakosimi)(front-end)
- [Nova Trauben ](https://github.com/1fabunicorn)(back-end)
