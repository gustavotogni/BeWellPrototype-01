import sys
import numpy as np

np.set_printoptions(threshold=sys.maxsize)
array = np.fromfile('C:\\Users\\i838713\\Git\\LimbicBackend\\data\\0.data')
print(array)
print(type(array))
print(len(array))

np.savez_compressed('zipped', array)


array = np.fromfile('C:\\Users\\i838713\\Git\\LimbicBackend\\data\\1.data')

print(array)
print(type(array))
print(len(array))