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

    getAttributes() {
        if (this.getAttribute('pippo-user')) {
            this.user = JSON.parse(this.getAttribute('pippo-user'));
        }
        if (this.getAttribute('has-button')) {
            this.hasButton = this.getAttribute('has-button') === 'true';
        }
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

        if (this.hasButton) {
            const button = document.createElement('button');
            const node = document.createTextNode('selectUser');
    
            button.appendChild(node);
            button.onclick = () => this.buttonClicked();
    
            this.shadowRoot.appendChild(button); 
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

    attributeChangedCallback() {
        this.getAttributes();
        this.initTag();
    }

    static get observedAttributes() {
        return ['pippo-user', 'has-button']; 
    }
}

window.customElements.define('pippo-tag', PippoTag);