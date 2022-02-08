class Navbar{
    constructor(config){
        this.id=config.id;
        this.title=config.title;
        this.navbarListItem=config.navbarListItem;
        this.element=!_isNull(config.element) && isElement(config.element)?
                    config.element:document.querySelector(config.element);
    }

    init(){
        let getData=localStorage.getItem("USER");
        this.userData=JSON.parse(getData);
        this.element.innerHTML=this.toHTML();
    }
    
    toHTML(){
        let html='';
        let navbarItem='';
        let index=0;
        {
            while(index<this.navbarListItem.length){
                navbarItem+=`
                <a class="navbarSubItemLink" 
                    href="${this.navbarListItem[index].navigateTo}" >
                    ${this.navbarListItem[index].navbarTitle}
                </a>
                `
                index++;
            }
        }
        
        html+=`
            <div class="navbar" >
                <div class="navbarItem">
                    <div>
                        <h3 class="navbarTitle" accesskey=${this.id}>${this.title}</h3>
                    </div>
                    ${this.userData?.isLoggedIn===AccountLoggedStatus.login?
                        `Welcome: ${this.userData?.name}`:""
                    }
                    <div class="navbarSubItem">
                        
                        ${navbarItem}
                        ${this.userData?.isLoggedIn===AccountLoggedStatus.login?
                            `<button  id="logout_button" class="logout_button">LOGOUT</button>`:""
                        }
                        
                    </div>
                </div>
            </div>
        `
        return html;
    }
}

$(document).ready(function(){
    let navbar=new Navbar({
        "id":"contact_manager_navbar_key",
        "title":"Contact Manager",
        "element":".contact_manager_navbar",
        "navbarListItem":getNavbarData()
    });
    navbar.init();

    let logoutButton=$("#logout_button")
    $(logoutButton).click(function(){
        logout()
    })
})
