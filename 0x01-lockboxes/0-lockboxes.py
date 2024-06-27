#!/usr/bin/python3
'''LockBoxes Challenge'''


def canUnlockAll(boxes):
    '''determines if all the boxes can be opened or not
    Returns:
        True: all boxes can be opened
        False: not all boxes can be opened
    '''
    num_boxes = len(boxes)
    keys = set()
    opened_boxes = set()
    i = 0

    while i < num_boxes:
        opened_boxes.add(i)
        keys.update(boxes[i])
        for key in keys:
            if key != 0 and key < num_boxes and key not in opened_boxes:
                i = key
                break

        else:
            break

    return len(opened_boxes) == num_boxes and 0 in opened_boxes
