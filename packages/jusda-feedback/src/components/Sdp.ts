interface registerTemplate {
    template?: Array<Object>
}
class Sdp {
    templateData:Array<Object> = [];
    regist(template: Array<Object>) {
        this.templateData = [...this.templateData, ...template];
    }
}
export default Sdp ;
