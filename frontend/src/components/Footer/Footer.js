
import React, {Component} from 'react';
import axios from 'axios';
import './footer.css';



export default class Footer extends Component{
    

    render(){
      
        return(
          
            <div>
                <footer className="foo">
                  <div class="copyright text-center">
                  Copyright © 2021 Travel Forest. All Rights Reserved
                    {/* Copyright &copy; 2021 <span>High Garden</span> */}
                  </div>
                </footer>
              </div>
        )
    }
}