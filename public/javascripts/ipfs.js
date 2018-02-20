const ipfs = window.IpfsApi('ipfs.infura.io', '5001', { protocol: 'https' });
const Buffer = new window.IpfsApi().Buffer;
const dirName = "peer-to-peer";

function readAsBuffer(file) {
    let reader = new FileReader();
    reader.readAsArrayBuffer(file);
    return new Promise((resolve, reject) => {
        reader.addEventListener("loadend", (evt) => resolve(Buffer.from(reader.result)) )
        reader.addEventListener("error", (err) => reject(err) )
    })
}

function makeIpfsObjects(files, buffers) {
    return buffers.map((buffer, key) => ({ 
        path: dirName + "/" + files[key].name,
        content: buffer   
    }));
}

function addToIpfs(files){
    let buffers = files.map(file => readAsBuffer(file));
    return Promise.all(buffers)
        .then((resultBuffers) => {
            let ipfsFiles = makeIpfsObjects(files, resultBuffers);
            return ipfs.add(ipfsFiles);
        }).then((files) => {
            let directory = files.find(({ path }) => path === dirName);
            return directory.hash;
        });
}
