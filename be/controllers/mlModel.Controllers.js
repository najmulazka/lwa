const { spawn } = require('child_process');

// Fungsi untuk menjalankan Python
const runPython = (text) => {
  return new Promise((resolve, reject) => {
    const python = spawn('python', ['./python/ml-model.py', text]);

    let result = '';
    python.stdout.on('data', (data) => {
      result += data.toString();
    });

    python.stderr.on('data', (error) => {
      reject(error.toString());
    });

    python.on('close', (code) => {
      if (code === 0) {
        resolve(result.trim());
      } else {
        reject(`Process exited with code: ${code}`);
      }
    });
  });
};

module.exports = {
  predict: async (req, res) => {
    const { text } = req.body;
    try {
      const prediction = await runPython(text);
      let dataArray = prediction.split('\r\n').map((item) => item.trim());

      let data = dataArray.reduce((acc, item) => {
        let [key, value] = item.split(':').map((part) => part.trim());
        if (key && value) {
          acc[key] = value;
        } else if (key) {
          acc[key] = null;
        }
        return acc;
      }, {});

      res.status(200).json({ status: true, message: 'Ok', data: Object.keys(data).pop() });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
};
