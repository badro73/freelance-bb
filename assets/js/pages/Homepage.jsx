import React from 'react'

const Homepage=()=>{

return (
<>
  <header className="masthead bg-primary text-white text-center pt-5">
    <div className="container d-flex align-items-center flex-column">
      
        <img className="masthead-avatar mb-5" src="assets/img/avataaars.svg" alt="" />
    
        <h1 className="masthead-heading text-uppercase mb-0">Application</h1>
    
        <div className="divider-custom divider-light">
            <div className="divider-custom-line"></div>
            <div className="divider-custom-icon"><i className="fas fa-star"></i></div>
            <div className="divider-custom-line"></div>
        </div>
      
        <p className="masthead-subheading font-weight-light mb-0">With - ApiPlatform - React.JS</p>
    </div>
  </header>
  <div class="pt-5">   
  </div>
<footer className="footer text-center">
<div className="container">
    <div className="row">
        
        <div className="col-lg-4 mb-5 mb-lg-0">
            <h4 className="text-uppercase mb-4">About Me</h4>
            <p className="lead mb-0">
            Développeur Symfony-React 
                <br />
                avec une expérience de 4 ans
            </p>
        </div>
     
        <div className="col-lg-4 mb-5 mb-lg-0">
            <h4 className="text-uppercase mb-4">Around the Web</h4>
        </div>
      
        <div className="col-lg-4">
            <h4 className="text-uppercase mb-4">Take a look</h4>
            <p className="lead mb-0"> 
                <a href="https://www.linkedin.com/in/badreddine-boukhalfa-a33062146/" target="_blank"> Check My linkedin </a>
                .
            </p>
        </div>
    </div>
</div>
</footer>

<div class="copyright py-4 text-center text-white">
            <div class="container"><small>Copyright © Freelance-bb 2020</small></div>
</div>

</>


);


}

export default Homepage;