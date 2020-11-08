import React from 'react'


const Footer=()=>{

    return(
        <footer className="page-footer font-small  darken-3 text-center mt-5">

            <div className="container ">

                <div className="row">

                    <div className="col-md-12 ">
                        <div className=" flex-center">

                            <span className="fb-ic">
                                <i className="fab fa-facebook-f fa-lg white-text mr-md-5 mr-3 fa-2x"></i>
                            </span>
                            <span className="tw-ic">
                                <i className="fab fa-twitter fa-lg white-text mr-md-5 mr-3 fa-2x"></i>
                            </span>
                            <a className="gplus-ic icon-bg" target='blank' href='https://github.com/syedsabtain/Project12a'>
                                <i className="fab fa-github fa-lg white-text mr-md-5 mr-3 fa-2x"></i>
                            </a>
                            <span className="li-ic">
                                <i className="fab fa-linkedin-in fa-lg white-text mr-md-5 mr-3 fa-2x"></i>
                            </span>
                            <span className="ins-ic">
                                <i className="fab fa-instagram fa-lg white-text mr-md-5 mr-3 fa-2x"></i>
                            </span>
                            <span className="pin-ic">
                                <i className="fab fa-pinterest fa-lg white-text fa-2x"></i>
                            </span>
                        </div>
                    </div>

                </div>

            </div>

            <div className="footer-copyright text-center py-3">© 2020 Copyright:
                <span>
                    SyedSabtain</span>
            </div>

        </footer>
    )
}
export default Footer