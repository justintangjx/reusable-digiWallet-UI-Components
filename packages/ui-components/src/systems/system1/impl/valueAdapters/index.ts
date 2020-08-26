import * as React from 'react';
import * as v from '../../models/values';
import * as c from '../common';

export class TopRightBottomLeftC {
    constructor(public readonly x: v.TopRightBottomLeft | undefined) {}
    private get(idx2: 0 | 1, idx4: 0 | 1 | 2 | 3) {
        const x = this.x;
        switch (typeof x) {
            case 'undefined': return 0;
            case 'number': return x;
            default:
                switch (x.length) {
                    case 2: return x[idx2];
                    case 4: return x[idx4];
                    default: return 0; // Should not reach this
                }
        }
    }
    top() {
        return this.get(0, 0);
    }
    right() {
        return this.get(1, 1);
    }
    bottom() {
        return this.get(0, 2);
    }
    left() {
        return this.get(1, 3);
    }
    toCSSValue(): string | number | undefined {
        const x = this.x;
        if (typeof x === 'undefined') {
            return undefined;
        }
        if (typeof x === 'number') {
            return x;
        }
        return x.map((xi): string => `${xi.toString()}px`).join(' ');
    }
}

export const trblC = (trbl: v.TopRightBottomLeft | undefined) => new TopRightBottomLeftC(trbl);

export class DimensionSizeC {
    constructor(
        public readonly x: v.DimensionSize | undefined,
        public readonly context: c.Context | undefined,
    ) {}
    asWidthToCSSDeclarations(): React.CSSProperties {
        const width = this.x;
        const context = this.context;
        if (typeof width === 'undefined') return {};
    
        if (typeof width === 'number') {
            if (typeof context === 'undefined') return {width};
            switch (context.parentLayoutType) {
                case 'flexRow': return {flexBasis: width};
                case 'flexRowOneChild': return {flexBasis: width};
                case 'flexColumn': return {width};
                case 'flexColumnOneChild': return {width};
            }
            return {width};
        }
    
        if (width === 'full') {
            if (context === undefined) return {};
            switch (context.parentLayoutType) {
                case 'flexRow': return {}; // Full-width in a flex-row parent is invalid and has no effect
                case 'flexRowOneChild': return { flexGrow: 1 };
                case 'flexColumn': return { alignSelf: 'stretch' };
                case 'flexColumnOneChild': return { alignSelf: 'stretch' };
            }
            return {};
        }
    
        if (width ==='content') {
            if (context === undefined) return {width};
            switch (context.parentLayoutType) {
                case 'flexColumn': return {width};
                case 'flexColumnOneChild': return {width};
                case 'flexRow': return { flexBasis: width};
                case 'flexRowOneChild': return { flexBasis: width};
            }
            return {width};
        }
    
        return {};
    }
    asHeightToCSSDeclarations(): React.CSSProperties {
        const height = this.x;
        const context = this.context;
        if (typeof height === 'undefined') return {};
    
        if (typeof height === 'number') {
            if (typeof context === 'undefined') return {height: height};
            switch (context.parentLayoutType) {
                case 'flexRow': return {height: height};
                case 'flexRowOneChild': return {height: height};
                case 'flexColumn': return {flexBasis: height};
                case 'flexColumnOneChild': return {flexBasis: height};
            }
            return {width: height};
        }
    
        if (height === 'full') {
            if (context === undefined) return {};
            switch (context.parentLayoutType) {
                case 'flexRow': return { alignSelf: 'stretch' };
                case 'flexRowOneChild': return { alignSelf: 'stretch' };
                case 'flexColumn': return {};  // Full-height in a flex-column parent is invalid and has no effect
                case 'flexColumnOneChild': return {
                    flexBasis: 0,
                    flexGrow: 1,
                };
            }
            return {};
        }
    
        if (height ==='content') {
            if (context === undefined) return {};
            switch (context.parentLayoutType) {
                case 'flexRow': return {};
                case 'flexRowOneChild': return {};
                case 'flexColumn': return {};
                case 'flexColumnOneChild': return {};
            }
            return {};
        }
    
        return {};
    }
}
export const dimSzC = (x: v.DimensionSize | undefined, context?: c.Context) => new DimensionSizeC(x, context);