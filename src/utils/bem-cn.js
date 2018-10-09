import { setup } from 'bem-cn';

const bemCn = setup({
    el: '__',
    mod: '--',
    modValue: '-'
});

const proxyClassName = (className, cn) => {
    let proxyCn = function () {
        let isBlock = false;
        // create actual array
        let args = Array.prototype.slice.call(arguments, 0);

        // check is block element or not
        if (typeof args[0] === 'undefined' || typeof args[0] === 'object') {
            (args.length === 0) && args.push({});

            isBlock = true;
        }

        return cn.apply(cn, args) + ((isBlock && className) ? ` ${className}` : '');
    };

    proxyCn.toString = function () {
        return cn().toString() + (className ? ` ${className}` : '');
    };

    return proxyCn;
};

export default function cn(blockName) {
    return function (target) {
        const proto = target.prototype;
        if (!proto.render || typeof proto.render !== 'function') return;

        const originalRender = proto.render;

        const cn = bemCn(blockName);

        target.prototype.render = function () {
            const proxyCn = proxyClassName(this.props.className, cn);

            return originalRender.call(this, proxyCn);
        };
    };
}
