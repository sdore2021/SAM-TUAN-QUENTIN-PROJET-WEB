import React, { Component } from "react";
import "../../public/css/login.css";
import * as utils from "../../public/js/login";
class Login extends Component {
  render() {
    return (
      <div className="cotn_principal">
        <div className="cont_centrar">
          <div className="cont_login">
            <div className="cont_info_log_sign_up">
              <div className="col_md_login">
                <div className="cont_ba_opcitiy">
                  <h2>LOGIN</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <button className="btn_login" onclick="utils.cambiar_login()">
                    LOGIN
                  </button>
                </div>
              </div>
              <div className="col_md_sign_up">
                <div className="cont_ba_opcitiy">
                  <h2>SIGN UP</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <button className="btn_sign_up" onclick="cambiar_sign_up()">
                    SIGN UP
                  </button>
                </div>
              </div>
            </div>
            <div className="cont_back_info">
              <div className="cont_img_back_grey">
                <img
                  src="https://images.unsplash.com/42/U7Fc1sy5SCUDIu4tlJY3_NY_by_PhilippHenzler_philmotion.de.jpg?ixlib=rb-0.3.5&q=50&fm=jpg&crop=entropy&s=7686972873678f32efaf2cd79671673d"
                  alt=""
                />
              </div>
            </div>
            <div className="cont_forms">
              <div className="cont_img_back_">
                <img
                  src="https://images.unsplash.com/42/U7Fc1sy5SCUDIu4tlJY3_NY_by_PhilippHenzler_philmotion.de.jpg?ixlib=rb-0.3.5&q=50&fm=jpg&crop=entropy&s=7686972873678f32efaf2cd79671673d"
                  alt=""
                />
              </div>
              <div className="cont_form_login">
                <a href="#" onclick="ocultar_login_sign_up()">
                  <i className="material-icons"></i>
                </a>
                <h2>LOGIN</h2>
                <input type="text" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button className="btn_login" onclick="cambiar_login()">
                  LOGIN
                </button>
              </div>
              <div className="cont_form_sign_up">
                <a href="#" onclick="ocultar_login_sign_up()">
                  <i className="material-icons"></i>
                </a>
                <h2>SIGN UP</h2>
                <input type="text" placeholder="Email" />
                <input type="text" placeholder="User" />
                <input type="password" placeholder="Password" />
                <input type="password" placeholder="Confirm Password" />
                <button className="btn_sign_up" onclick="cambiar_sign_up()">
                  SIGN UP
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
