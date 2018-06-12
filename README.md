# React Gradient Container

![React Gradient Container](http://g.recordit.co/44v9q8QT7b.gif)

### About

This project follows the [ducks modular redux](https://github.com/erikras/ducks-modular-redux) pattern and the airbnb code style, its a redux implementation of a progressive interpolated gradient, you can put any content within it and have it present over a moving gradient background, it is highly customizable and it has been tested on google chrome, firefox, safari, android and iOS.

### Installation

  `npm install --save react-gradient-container`
   
   or 
   
   `yarn add react-gradient-container`

### Usage

    import ReactGradientContainer from 'react-gradient-container'
    
    export default props => {
    	return (
    		<ReactGradientContainer>
    			{props.children}
    		</ReactGradientContainer>
    	)
    }
    
### Technical Debt

* tests are pending
* expose initial colors for more customization options

### License

[MIT License](https://github.com/jdmg94/react-gradient-container/blob/master/LICENSE)

Copyright (c) 2018 José David Muñoz


    	

