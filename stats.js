var pollTime = 1000;
module.exports = function (req, res, next) {
    var pollInterval;

    function pollStats () {
        if (typeof req.stats._lastMeasuredTime === 'object') {
            var secondsSinceLastMeasurement = ((new Date() - req.stats._lastMeasuredTime) / 1000);
            req.stats.averageRate = {
                read: (req.socket.bytesRead - req.stats.bytesRead) / secondsSinceLastMeasurement,
                write: (req.socket.bytesWritten - req.stats.bytesWritten) / secondsSinceLastMeasurement
            };
        }
        req.stats._lastMeasuredTime = new Date();
        req.stats.bytesRead = req.socket.bytesRead;
        req.stats.bytesWritten = req.socket.bytesWritten;
    }

    req.stats = {
        startTime: new Date(),
        endTime: null,
        averageRate: {read: null, write: null},
        bytesRead: req.socket.bytesRead,
        bytesWritten: req.socket.bytesWritten,
        _lastMeasuredTime: new Date()
    };

    pollInterval = setInterval(pollStats, pollTime);

    res.on('finishBeforeSocketDestroy', function () {
        clearInterval(pollInterval);
        pollStats();
        req.stats.endTime = new Date();
    });

    next();
}