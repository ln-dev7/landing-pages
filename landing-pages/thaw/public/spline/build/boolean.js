/* @ts-self-types="./boolean_wasm.d.ts" */

export class CsgMesh {
    static __wrap(ptr) {
        const obj = Object.create(CsgMesh.prototype);
        obj.__wbg_ptr = ptr;
        CsgMeshFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CsgMeshFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_csgmesh_free(ptr, 0);
    }
    /**
     * [centerX, centerY, centerZ, extentX, extentY, extentZ]
     * (half-extents, matching the AABB contract of the boolean API).
     * @returns {Float32Array}
     */
    bounds() {
        const ret = wasm.csgmesh_bounds(this.__wbg_ptr);
        var v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * `normals` (optional) is the source geometry's per-vertex normal array,
     * parallel to `positions`. When both operands of a boolean carry
     * normals, the result inherits them through the cut (sharp corners
     * encoded as duplicated vertices survive); without them, render output
     * falls back to the phong-angle recompute.
     * @param {Float32Array} positions
     * @param {Uint32Array} indices
     * @param {Float32Array | null} [normals]
     */
    constructor(positions, indices, normals) {
        const ptr0 = passArrayF32ToWasm0(positions, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray32ToWasm0(indices, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        var ptr2 = isLikeNone(normals) ? 0 : passArrayF32ToWasm0(normals, wasm.__wbindgen_malloc);
        var len2 = WASM_VECTOR_LEN;
        const ret = wasm.csgmesh_new(ptr0, len0, ptr1, len1, ptr2, len2);
        this.__wbg_ptr = ret;
        CsgMeshFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Column-major 4x4 matrix (three.js `Matrix4.elements` layout),
     * applied in place.
     * @param {Float32Array} m
     */
    transform(m) {
        const ptr0 = passArrayF32ToWasm0(m, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.csgmesh_transform(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {number}
     */
    tri_count() {
        const ret = wasm.csgmesh_tri_count(this.__wbg_ptr);
        return ret >>> 0;
    }
}
if (Symbol.dispose) CsgMesh.prototype[Symbol.dispose] = CsgMesh.prototype.free;

export class RenderData {
    static __wrap(ptr) {
        const obj = Object.create(RenderData.prototype);
        obj.__wbg_ptr = ptr;
        RenderDataFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RenderDataFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_renderdata_free(ptr, 0);
    }
    /**
     * @returns {Float32Array}
     */
    normals() {
        const ret = wasm.renderdata_normals(this.__wbg_ptr);
        var v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {Float32Array}
     */
    positions() {
        const ret = wasm.renderdata_positions(this.__wbg_ptr);
        var v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
}
if (Symbol.dispose) RenderData.prototype[Symbol.dispose] = RenderData.prototype.free;

export class TopologicalData {
    static __wrap(ptr) {
        const obj = Object.create(TopologicalData.prototype);
        obj.__wbg_ptr = ptr;
        TopologicalDataFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TopologicalDataFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_topologicaldata_free(ptr, 0);
    }
    /**
     * @returns {Uint32Array}
     */
    indices() {
        const ret = wasm.topologicaldata_indices(this.__wbg_ptr);
        var v1 = getArrayU32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {Float32Array}
     */
    positions() {
        const ret = wasm.topologicaldata_positions(this.__wbg_ptr);
        var v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
}
if (Symbol.dispose) TopologicalData.prototype[Symbol.dispose] = TopologicalData.prototype.free;

/**
 * op: 0 = union, 1 = intersect, 2 = subtract (A minus B).
 * The result is a full mesh set, usable as an operand of further booleans
 * (its acceleration/weld structures build lazily on first such use).
 * @param {CsgMesh} a
 * @param {CsgMesh} b
 * @param {number} op
 * @returns {CsgMesh}
 */
export function boolean_mesh(a, b, op) {
    _assertClass(a, CsgMesh);
    _assertClass(b, CsgMesh);
    const ret = wasm.boolean_mesh(a.__wbg_ptr, b.__wbg_ptr, op);
    return CsgMesh.__wrap(ret);
}

/**
 * Independent copy (single-operand boolean results must not alias their
 * operand — the caller transforms results in place).
 * @param {CsgMesh} mesh
 * @returns {CsgMesh}
 */
export function clone_mesh(mesh) {
    _assertClass(mesh, CsgMesh);
    const ret = wasm.clone_mesh(mesh.__wbg_ptr);
    return CsgMesh.__wrap(ret);
}

/**
 * Folds a shape's cloner copies into a single mesh set. `transforms` is a
 * flat run of column-major 4x4 matrices (three.js `Matrix4.elements`
 * layout), one per copy — the geometry crosses the boundary once no matter
 * how many copies there are.
 *
 * Copies whose boxes don't touch are merged by concatenating their
 * triangles, with no boolean run at all. Classification already reads that
 * pile as one solid: a parity ray crosses each closed copy an even number of
 * times, and welding never joins copies that are apart, so the island fill
 * keeps them separate. Copies that do touch are unioned for real, and only
 * against the ones they touch.
 * @param {CsgMesh} mesh
 * @param {Float32Array} transforms
 * @returns {CsgMesh}
 */
export function instanced_union(mesh, transforms) {
    _assertClass(mesh, CsgMesh);
    const ptr0 = passArrayF32ToWasm0(transforms, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.instanced_union(mesh.__wbg_ptr, ptr0, len0);
    return CsgMesh.__wrap(ret);
}

/**
 * Non-indexed render output. A mesh with carried normals hands them out
 * as-is (inherited shading; `phong_angle_deg` doesn't apply); one without
 * falls back to the phong-angle recompute. The getters hand their buffer
 * out once (second call returns empty).
 * @param {CsgMesh} mesh
 * @param {number} phong_angle_deg
 * @returns {RenderData}
 */
export function mesh_render_data(mesh, phong_angle_deg) {
    _assertClass(mesh, CsgMesh);
    const ret = wasm.mesh_render_data(mesh.__wbg_ptr, phong_angle_deg);
    return RenderData.__wrap(ret);
}

/**
 * Welded, indexed triangle output (verticesPerFace is implicitly all 3s).
 * The getters hand their buffer out once (second call returns empty).
 * @param {CsgMesh} mesh
 * @returns {TopologicalData}
 */
export function mesh_topological_data(mesh) {
    _assertClass(mesh, CsgMesh);
    const ret = wasm.mesh_topological_data(mesh.__wbg_ptr);
    return TopologicalData.__wrap(ret);
}
function __wbg_get_imports() {
    const import0 = {
        __proto__: null,
        __wbg___wbindgen_throw_bb96b2010945f0bc: function(arg0, arg1) {
            throw new Error(getStringFromWasm0(arg0, arg1));
        },
        __wbindgen_init_externref_table: function() {
            const table = wasm.__wbindgen_externrefs;
            const offset = table.grow(4);
            table.set(0, undefined);
            table.set(offset + 0, undefined);
            table.set(offset + 1, null);
            table.set(offset + 2, true);
            table.set(offset + 3, false);
        },
    };
    return {
        __proto__: null,
        "./boolean_wasm_bg.js": import0,
    };
}

const CsgMeshFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_csgmesh_free(ptr, 1));
const RenderDataFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_renderdata_free(ptr, 1));
const TopologicalDataFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_topologicaldata_free(ptr, 1));

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
}

function getArrayF32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getFloat32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

function getArrayU32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

let cachedFloat32ArrayMemory0 = null;
function getFloat32ArrayMemory0() {
    if (cachedFloat32ArrayMemory0 === null || cachedFloat32ArrayMemory0.byteLength === 0) {
        cachedFloat32ArrayMemory0 = new Float32Array(wasm.memory.buffer);
    }
    return cachedFloat32ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
    return decodeText(ptr >>> 0, len);
}

let cachedUint32ArrayMemory0 = null;
function getUint32ArrayMemory0() {
    if (cachedUint32ArrayMemory0 === null || cachedUint32ArrayMemory0.byteLength === 0) {
        cachedUint32ArrayMemory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachedUint32ArrayMemory0;
}

let cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

function passArray32ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 4, 4) >>> 0;
    getUint32ArrayMemory0().set(arg, ptr / 4);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passArrayF32ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 4, 4) >>> 0;
    getFloat32ArrayMemory0().set(arg, ptr / 4);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
cachedTextDecoder.decode();
const MAX_SAFARI_DECODE_BYTES = 2146435072;
let numBytesDecoded = 0;
function decodeText(ptr, len) {
    numBytesDecoded += len;
    if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
        cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
        cachedTextDecoder.decode();
        numBytesDecoded = len;
    }
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

let WASM_VECTOR_LEN = 0;

let wasmModule, wasmInstance, wasm;
function __wbg_finalize_init(instance, module) {
    wasmInstance = instance;
    wasm = instance.exports;
    wasmModule = module;
    cachedFloat32ArrayMemory0 = null;
    cachedUint32ArrayMemory0 = null;
    cachedUint8ArrayMemory0 = null;
    wasm.__wbindgen_start();
    return wasm;
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (!module.ok) {
            throw new Error(`failed to fetch Wasm: ${module.status} ${module.statusText} fetching '${module.url}'`);
        }

        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);
            } catch (e) {
                const validResponse = expectedResponseType(module.type);

                if (validResponse && module.headers.get('Content-Type') !== 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else { throw e; }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);
    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };
        } else {
            return instance;
        }
    }

    function expectedResponseType(type) {
        switch (type) {
            case 'basic': case 'cors': case 'default': return true;
        }
        return false;
    }
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (module !== undefined) {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports();
    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }
    const instance = new WebAssembly.Instance(module, imports);
    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (module_or_path !== undefined) {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }

    if (module_or_path === undefined) {
        module_or_path = new URL('boolean.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync, __wbg_init as default };
