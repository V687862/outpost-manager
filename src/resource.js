export default class Resource {
    constructor(name, isLinkResource = false) {
        this.name = name;
        this.isLinkResource = isLinkResource;
    }
}
