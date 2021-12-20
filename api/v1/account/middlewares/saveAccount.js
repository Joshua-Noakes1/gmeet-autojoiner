const path = require('path'),
    {
        readJSON,
        writeJSON
    } = require('../../../../lib/readWrite');

async function saveAccount(accountData) {
    var account = await readJSON(path.join(__dirname, '../', '../', '../', '../', 'data', 'account.json'), true);

    if (account.success == false) account = {success: true, email: "", password: ""};

    account.email = accountData.email;
    account.password = accountData.password;

    try {
        await writeJSON(path.join(__dirname, '../', '../', '../', '../', 'data', 'account.json'), account, true);
        return {
            success: true,
            message: `Saved account`
        };
    } catch (error) {
        console.log(error);
        return {
            success: false
        };
    }
}

module.exports = saveAccount;