class PippoTag extends HTMLElement{

    styleTemplate = `
    .par{
        color: green;
    }`;

    htmlTemplate = `
        <h2>#USERNAME</h2>
        <h2>#MAIL</h2>
    `

    // user = {
    //     name: "Andrea",
    //     mail: "pippo@grr.la"
    // };

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.getAttributes();
        this.initStyle();
        this.initTag();
    }

    attributeChangedCallback() {
        this.getAttributes();
        this.initTag();
    }

    static get observedAttributes() {
        return ['pippo-user']; 
    }

    initStyle() {
        const style = document.createElement('style');
        style.innerText = this.styleTemplate;
        this.shadowRoot.appendChild(style);
    }

    initTag() {

        if (this.user) {
            this.htmlTemplate = this.htmlTemplate.replace('#USERNAME', this.user.name);
            this.htmlTemplate = this.htmlTemplate.replace('#MAIL', this.user.mail);
    
            this.shadowRoot.innerHTML = this.htmlTemplate;    
        }

        const button = document.createElement('button');
        const node = document.createTextNode('selectUser');

        button.appendChild(node);
        button.onclick = () => this.buttonClicked();

        this.shadowRoot.appendChild(button);
        if (this.hasButton) {
            
        }
        
        // const node = document.createTextNode('Pippo');
        // const p = document.createElement('p');
        // p.className = 'par';
        // p.appendChild(node);
        // this.shadowRoot.appendChild(p);
    }

    buttonClicked() {
        const event = new CustomEvent('user-selected', {
            bubbles: true,
            detail: this.user
        });
        this.dispatchEvent(event);
    }

    getAttributes() {
        if (this.getAttribute('pippo-user')) {
            this.user = JSON.parse(this.getAttribute('pippo-user'));
        }
        if (this.getAttribute('has-button')) {
            this.hasButton = this.getAttribute('has-button') = 'true';
        }
    }
}

window.customElements.define('pippo-tag', PippoTag);