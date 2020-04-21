module.exports = {
    networks: {
        development: {
            host: "localhost",
            port: 8545,
            network_id: "*", // Match any network id
            gas: 5000000
        }
    },
    compilers: {
        solc: {
            settings: {
                optimizer: {
                    enabled: true, // Default is false
                    runs: 200 // Default is 200
                }
            }
        }
    }
};