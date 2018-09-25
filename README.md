# React Gradient Container

### Changelog v1.2.4

* Colors prop
* Code Cleanup
* Orientation prop
* Component Encapsulation

### About

This project follows the [ducks modular redux](https://github.com/erikras/ducks-modular-redux) pattern and the airbnb code style, its a redux implementation of a progressive interpolated gradient, you can put any content within it and have it present over a moving gradient background, it is highly customizable and it has been tested on Chrome, Firefox, Safari, Opera, Android and iOS.

### Installation

  `npm install --save react-gradient-container`

   or

   `yarn add react-gradient-container`

### Usage	

    import GradientContainer from 'react-gradient-container'

    export default props => {
    	return <GradientContainer {...props} />
    }
    
  

| Name   | Description | Default Value |
|--------|-------------|:-------------:|
| colors | The color values used to transition a gradient. It can be an array of hex values with or without has, or a vector of RGB values   | ```['3E23FF', '3CFF3C', 'FF2362', '2DAFE6', 'FF00FF']``` |
| orientation | general direction of the gradient. The value can represent a pair of coordinate or a radial value expressed as a degree. | ```[ 'bottom', 'right' ]``` |

### Technical Debt

* tests are pending

### License

[MIT License](https://github.com/jdmg94/react-gradient-container/blob/master/LICENSE)

Copyright (c) 2018 José David Muñoz
